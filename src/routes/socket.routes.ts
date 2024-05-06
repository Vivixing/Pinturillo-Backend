import { SocketController } from "../controllers/socket.controller";
import { SalaDeJuegoRepository } from "../repositories/SalaDeJuego.repository";


const express = require('express');
const router = express.Router();

module.exports = (expressWs) => {
    const salaDeJuegoRepository = new SalaDeJuegoRepository();
    const socketController = new SocketController();
    expressWs.applyTo(router);

    const rooms = {};
    let adivinado = [];

    router.ws('/room/:idSalaDeJuego',async (ws, req) => {
        const idSalaDeJuego = req.params.idSalaDeJuego;
        const userName = req.headers.username;
        let puntaje = 0;
        let maxRondas = 8;

        if (await salaDeJuegoRepository.findByIdSalaDeJuego(idSalaDeJuego) === null){
        console.log("Sala de juego no encontrada")
        ws.close();
        return;
        }

        if (!rooms[idSalaDeJuego]) {
            rooms[idSalaDeJuego] = new Set();
        }

        socketController.joinRoom( ws, idSalaDeJuego);
        const turnosJugadores = socketController.assignATurn(idSalaDeJuego);

        const turnoJugador = await(socketController.playerTurn(idSalaDeJuego, ws));
        rooms[idSalaDeJuego].add({ ws, userName, puntaje, turnoJugador });
        
        rooms[idSalaDeJuego].forEach(client => {
            if (client.ws == ws){
                client.ws.send(`Tienes el turno ${turnoJugador}`);
            }
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                client.ws.send(`${userName} se ha unido a la sala de juego`);
            }
        }
    );
        if (rooms[idSalaDeJuego].size === 1) {
            rooms[idSalaDeJuego].forEach(client => {
                if (client.ws.readyState === ws.OPEN) {
                    client.ws.send(`Esperando a que se unan más jugadores`);
                }
            });
        } 
        ws.on('message', async function (msg) {
            const jsonMessage = JSON.parse(msg);
            if (jsonMessage.type === 'SEND_MESSAGE') {
                rooms[idSalaDeJuego].forEach(async client => {
                    const mensajePalabra = socketController.guessWord(idSalaDeJuego,jsonMessage.data);
                    
                    if (client.ws == ws && client.ws.readyState === ws.OPEN && mensajePalabra) {
                            client.ws.send(`¡Adivinaste la palabra :D!`);
                            adivinado.push(client.ws);
                            const puntos = await socketController.points(idSalaDeJuego, adivinado.length-1);
                            client.puntaje += puntos;
                            client.ws.send(`Tienes ${client.puntaje} puntos`);
                            
                    }
                    
                    if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                        if(mensajePalabra){
                            client.ws.send(`¡¡${userName} ha adivinado la palabra!!`);
                        } else {
                        client.ws.send(`${userName}: ${jsonMessage.data}`);
                        }
                    }
                    if (adivinado.length === rooms[idSalaDeJuego].size) {
                        rooms[idSalaDeJuego].forEach(client => {
                            if (client.ws.readyState === ws.OPEN) {
                                client.ws.send(`¡Todos adivinaron la palabra!`);
                            }
                        });
                    }
                });
            }
            else if (jsonMessage.type === 'START_GAME' && rooms[idSalaDeJuego].size > 1) {
                await game();
            }     
        });

        async function game(){
            rooms[idSalaDeJuego].forEach(async client => {
                if (client.ws.readyState === ws.OPEN && client.turnoJugador === 1) {
                    adivinado.push(client.ws);
                    const palabraAsignada = await socketController.asignWord(idSalaDeJuego);
                    client.ws.send(`La palabra a dibujar es: ${palabraAsignada}`);
                    client.turnoJugador = rooms[idSalaDeJuego].size;
                }
                else{
                    client.ws.send(`!El juego ha comenzado!`);
                    client.turnoJugador--;
                }
                const tiempoLimite = 90;
                let contador = tiempoLimite;
                client.ws.send(`Tiempo restante: ${contador} segundos`);
        
                const intervalo = setInterval(() => {
                    contador--;
                    if (contador > 0 && adivinado.length < rooms[idSalaDeJuego].size) {
                        //client.ws.send(`Tiempo restante: ${contador} segundos`);
                    } else {
                        clearInterval(intervalo);
                        if (client.ws == ws && client.ws.readyState === ws.OPEN) {
                            client.ws.send(`Tu turno ha terminado`);
                        }
                        else if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                            client.ws.send(`El turno de ${userName} ha terminado`);
                        }
                        console.log(client.turnoJugador);
                        fininishTurn();

                    }
                }, 1000);
                });
        }
        async function fininishTurn(){
                if(maxRondas > 0){
                    maxRondas--;
                    adivinado = [];
                    await game();
                }
                else {
                    rooms[idSalaDeJuego].forEach(client => {
                        if (client.ws.readyState === ws.OPEN) {
                            client.ws.send(`¡Fin del juego!`);
                        return;
                        }

                        rooms[idSalaDeJuego].forEach(client => {
                            if (client.ws.readyState === ws.OPEN) {
                                client.ws.send(`Puntaje de ${client.userName}: ${client.puntaje}`);
                            }
                        });
                    });
                };
        }

        ws.on('close', function () {
            rooms[idSalaDeJuego].delete(ws);
            if (rooms[idSalaDeJuego].size === 0) {
                delete rooms[idSalaDeJuego];
            }
            socketController.leaveRoom(ws, idSalaDeJuego);
            turnosJugadores.splice(turnosJugadores.indexOf(ws), 1);

            rooms[idSalaDeJuego].forEach(async client => {
                if (client.ws.readyState === ws.OPEN) {
                    client.ws.send(`${userName} ha abandonado a la sala de juego`);
                    const turnoNuevo = await socketController.playerTurn(idSalaDeJuego, client.ws);
                    client.ws.send(`Tienes el turno ${turnoNuevo}`);
                }
            }
            );  
        });
    });

    return router;
};