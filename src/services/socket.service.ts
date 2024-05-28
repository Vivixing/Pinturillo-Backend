import { PalabraResponse } from "../dto/palabra.dto";
import { SocketRepository } from "../repositories/socket.repository";


export class SocketService {
    public static rooms = {};
    public clientWithTurn = [];
    public adivinado = [];
    public tiempo = 0;
    public palabraAsignada = "";
    public maxRondas = 1;
    public socketRepository = new SocketRepository

    async verifyRoom(idSalaDeJuego) {
        try {
            const sala = await this.socketRepository.getRoom(idSalaDeJuego)
            if (sala === null) {
                throw new Error("No se ha encontrado la sala de juego")
            }
            sala.estado = "En curso";
            await this.socketRepository.updateRoom(sala)
            return sala;
        } catch (error) {
            throw new Error("Número de sala de juego no válido")
        }
    }

    async closeRoom(idSalaDeJuego) {
        try {
            const sala = await this.verifyRoom(idSalaDeJuego)
            sala.estado = "Finalizado";
            await this.socketRepository.updateRoom(sala)
        } catch (error) {
            throw new Error("Error al acceder a la sala")
        }

    }
    async joinRoom(ws, username, idSalaDeJuego) {
        if (!SocketService.rooms[idSalaDeJuego]) {
            SocketService.rooms[idSalaDeJuego] = new Set();
        }
        SocketService.rooms[idSalaDeJuego].add({ ws, username, puntos: 0 });
        return SocketService.rooms[idSalaDeJuego];
    }

    leaveRoom(ws, idSalaDeJuego) {
        if (SocketService.rooms[idSalaDeJuego]) {
            const clientToDelete = Array.from(SocketService.rooms[idSalaDeJuego]).find((client: any) => client.ws === ws);
            SocketService.rooms[idSalaDeJuego].delete(clientToDelete);
            if (SocketService.rooms[idSalaDeJuego].size === 0) {
                delete SocketService.rooms[idSalaDeJuego];
            }
            this.clientWithTurn = [];
            return SocketService.rooms[idSalaDeJuego]
        }
    }
    obtainPlayers(idSalaDeJuego, ws) {
        if (SocketService.rooms[idSalaDeJuego]) {
            const players = Array.from(SocketService.rooms[idSalaDeJuego]).map(({ username, puntos }: any) => ({ username, puntos }));
            var mensaje = JSON.stringify(({ type: 'PLAYERS', data: players }));
            ws.send(`${mensaje}`);
            return players;
        }
    }
    async welcomeRoom(idSalaDeJuego, ws, username) {
        const clientWithTurn = this.assignATurn(idSalaDeJuego)
        const turnoJugador = await this.playerTurn(idSalaDeJuego, ws);
        SocketService.rooms[idSalaDeJuego].forEach(client => {
            if (client.ws == ws) {
                var mensaje = JSON.stringify(({ type: 'TURN', data: turnoJugador }));
                client.ws.send(`${mensaje}`);
            }
            if (SocketService.rooms[idSalaDeJuego].size === 1) {
                SocketService.rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws.readyState === ws.OPEN) {
                        var mensaje = JSON.stringify(({ type: 'ANNOUNCEMENT', data: 'Esperando a más jugadores...'}));
                        client.ws.send(`${mensaje}`);
                    }
                });
            }
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                var players =  this.obtainPlayers(idSalaDeJuego, client.ws);
                var mensaje = JSON.stringify(({ type: 'JOIN_ROOM', data: `${username}`}));
                client.ws.send(`${mensaje}`);
            }
        }
        );
    }

    sendMessage(message, idSalaDeJuego, ws, username) {
        SocketService.rooms[idSalaDeJuego].forEach(async client => {
            const mensajePalabra = this.guessWord(idSalaDeJuego, message);
            if (client.ws == ws && client.ws.readyState === ws.OPEN && mensajePalabra && this.adivinado.includes(client.ws) === false) {
                var mensaje = JSON.stringify(({ type: 'GUESSWORD', data: '¡Adivinaste la palabra!'}));
                client.ws.send(`${mensaje}`);
                this.adivinado.push(client.ws);
                const puntos = await this.points(idSalaDeJuego, SocketService.length - 1, ws, this.tiempo);
                var mensaje = JSON.stringify(({ type: 'POINTS', data: puntos }));
                client.ws.send(`${mensaje}`);
                SocketService.rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws.readyState === ws.OPEN) {
                        this.obtainPlayers(idSalaDeJuego, client.ws);
                    }
                });
            }
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                if (mensajePalabra) {
                    var mensaje = JSON.stringify(({ type: 'ANNOUNCEMENT', data: `${username} ha adivinado la palabra` }));
                    client.ws.send(`${mensaje}`);
                } else if (mensajePalabra === false) {
                    var mensaje = JSON.stringify(({ type: 'MESSAGE', data: `${username}: ${message}` }));
                    client.ws.send(`${mensaje}`);
                }
            }
            if (this.adivinado.length === SocketService.rooms[idSalaDeJuego].size) {
                SocketService.rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws.readyState === ws.OPEN) {
                        var mensaje = JSON.stringify(({ type: 'ANNOUNCEMENT', data: '¡Todos adivinaron la palabra!'}));
                        client.ws.send(`${mensaje}`);
                    }
                });
            }
        });
    }

    guessWord(idSalaDeJuego, message) {
        if (SocketService.rooms[idSalaDeJuego]) {
            if (message.toLowerCase() === this.palabraAsignada.toLowerCase()) {
                return true;
            }
            return false;
        }
    }

    assignATurn(idSalaDeJuego) {
        if (SocketService.rooms[idSalaDeJuego]) {
            this.clientWithTurn = [];
            const clients = Array.from(SocketService.rooms[idSalaDeJuego]);
            for (const client of clients) {
                const turno = Math.floor(clients.indexOf(client)) + 1;
                this.clientWithTurn.push({ client, turno });
            }
            return this.clientWithTurn;
        }
    }

    playerTurn(idSalaDeJuego, ws) {
        if (SocketService.rooms[idSalaDeJuego]) {
            for (const client of this.clientWithTurn) {
                if (client.client.ws === ws) {
                    return client.turno;
                }
            }
        }
    }
    async asignWord(idSalaDeJuego) {
        if (SocketService.rooms[idSalaDeJuego]) {
            const sala = await this.socketRepository.getRoom(idSalaDeJuego);
            const categoria = sala.idCategoria;

            const palabras = await this.socketRepository.wordsCategory(categoria)
            const randomIndex = Math.floor(Math.random() * palabras.length);
            const randomWord = palabras[randomIndex];

            const palabraSeleccionada: PalabraResponse = await this.socketRepository.word(randomWord.idPalabra);
            this.palabraAsignada = palabraSeleccionada.texto;
            return this.palabraAsignada;
        }
        return null;
    }

    async points(idSalaDeJuego, puesto, ws, tiempo) {
        if (SocketService.rooms[idSalaDeJuego]) {
            for (const client of SocketService.rooms[idSalaDeJuego]) {
                if (client.ws === ws) {
                    const scoreFrontPosition = (SocketService.rooms[idSalaDeJuego].size - puesto) * 10;
                    const maxTime = 90;
                    const timeScoreFactor = Math.max(0, 1 - ((maxTime - tiempo) / maxTime));
                    const scoreFrontTime = Math.floor(timeScoreFactor * 100);
                    const totalScore = scoreFrontPosition + scoreFrontTime;
                    client.puntos += totalScore;
                    return totalScore;
                }
            }
        }
    }

    endTurn(idSalaDeJuego) {
        if (SocketService.rooms[idSalaDeJuego]) {
            for (const client of this.clientWithTurn) {
                if (client.turno == 1) {
                    client.turno = SocketService.rooms[idSalaDeJuego].size;
                } else {
                    client.turno--;
                }
            }
            return this.clientWithTurn;
        }
    }
    endGame(idSalaDeJuego, ws) {
        this.palabraAsignada = "";
        if (SocketService.rooms[idSalaDeJuego]) {
            const clients = Array.from(SocketService.rooms[idSalaDeJuego]);
            const results = clients.map((client: any) => {
                return {
                    name: client.username,
                    score: client.puntos
                };
            });
            results.sort((a: any, b: any) => b.score - a.score);
            results.forEach((result: any, index: number) => {
                var mensaje = JSON.stringify(({ type: 'RESULTS', data: `${index + 1}. ${result.name}: ${result.score}` }));
                ws.send(`${mensaje}`);
            });
            return results;
        }
    }
    async game(idSalaDeJuego, ws) {
        try {
            this.palabraAsignada = await this.asignWord(idSalaDeJuego);
            const clientes = Array.from(SocketService.rooms[idSalaDeJuego]);
            let usuario = "";
            const promises = clientes.map(async (client: any) => {
                const turno = await this.playerTurn(idSalaDeJuego, client.ws);
                if (client.ws.readyState === ws.OPEN && turno === 1) {
                    usuario = client.username;
                    this.adivinado.push(client.ws);
                    var mensaje = JSON.stringify(({ type: 'WORD', data: `${this.palabraAsignada}` }));
                    client.ws.send(`${mensaje}`);
                    this.clientWithTurn = this.endTurn(idSalaDeJuego);
                } else {
                    var mensaje = JSON.stringify(({ type: 'USER_TURN', data: `${usuario}` }));
                    client.ws.send(`${mensaje}`);
                }
                const tiempoLimite = 90;
                let contador = tiempoLimite;
                return new Promise<void>((resolve) => {
                    const intervalo = setInterval(() => {
                        contador--;
                        this.tiempo = contador;
                        if (contador > 0 && this.adivinado.length < this.clientWithTurn.length) {
                            var mensaje = JSON.stringify(({ type: 'TIME', data: contador }));
                            client.ws.send(`${mensaje}`);
                        } else {
                            clearInterval(intervalo);
                            var mensaje = JSON.stringify(({ type: 'USER_END_TURN', data: usuario }));
                            client.ws.send(`${mensaje}`);
                            resolve();
                        }
                    }, 1000);
                });
            });
            await Promise.all(promises);
            this.finishTurn(idSalaDeJuego, ws);
        } catch (error) {
            console.error("Error en la función game:", error);
        }
    }

    async finishTurn(idSalaDeJuego, ws) {
        this.maxRondas--;
        if (this.maxRondas > 0) {
            this.adivinado = [];
            return await this.game(idSalaDeJuego, ws);
        }
        else {
            SocketService.rooms[idSalaDeJuego].forEach(client => {
                if (client.ws.readyState === ws.OPEN) {
                    this.endGame(idSalaDeJuego, client.ws);
                    var mensaje = JSON.stringify(({ type: 'END_GAME', data: '¡Fin del juego!' }));
                    client.ws.send(`${mensaje}`);
                }
                this.adivinado = [];
                this.palabraAsignada = "";
                this.closeRoom(idSalaDeJuego);
            });
        };
    }

    async leave(ws, idSalaDeJuego, userName) {
        try {
            SocketService.rooms[idSalaDeJuego] = await this.leaveRoom(ws, idSalaDeJuego);
            if (SocketService.rooms[idSalaDeJuego].size === 0) {
                delete SocketService.rooms[idSalaDeJuego];
            }
            this.clientWithTurn = this.assignATurn(idSalaDeJuego);
            SocketService.rooms[idSalaDeJuego].forEach(async client => {
                if (client.ws.readyState === ws.OPEN) {
                    var mensaje = JSON.stringify(({ type: 'LEAVE_ROOM', data: `${userName}` }));
                    client.ws.send(`${mensaje}`);
                    const turnoNuevo = await this.playerTurn(idSalaDeJuego, client.ws);
                    var mensaje = JSON.stringify(({ type: 'TURN', data: turnoNuevo }));
                    client.ws.send(`${mensaje}`);
                }
            }
            );
        }
        catch (error) {
            console.error("No hay jugadores en la sala de juego");
        }
    }
}
