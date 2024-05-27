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

    async welcomeRoom(idSalaDeJuego, ws, username) {
        const clientWithTurn = this.assignATurn(idSalaDeJuego)
        const turnoJugador = await this.playerTurn(idSalaDeJuego, ws);
        SocketService.rooms[idSalaDeJuego].forEach(client => {
            if (client.ws == ws) {
                client.ws.send(`Tienes el turno ${turnoJugador}`);
            }
            if (SocketService.rooms[idSalaDeJuego].size === 1) {
                SocketService.rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws.readyState === ws.OPEN) {
                        client.ws.send(`Esperando a que se unan más jugadores`);
                    }
                });
            }
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                client.ws.send(`${username} se ha unido a la sala de juego`);
            }
        }
        );
    }

    sendMessage(message, idSalaDeJuego, ws) {
        SocketService.rooms[idSalaDeJuego].forEach(async client => {
            const mensajePalabra = this.guessWord(idSalaDeJuego, message);

            if (client.ws == ws && client.ws.readyState === ws.OPEN && mensajePalabra && this.adivinado.includes(client.ws) === false) {
                client.ws.send(`¡Adivinaste la palabra :D!`);
                this.adivinado.push(client.ws);
                const puntos = await this.points(idSalaDeJuego, SocketService.length - 1, ws, this.tiempo);
                client.ws.send(`Conseguiste ${puntos} puntos`);
            }
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                if (mensajePalabra) {
                    client.ws.send(`¡¡${client.username} ha adivinado la palabra!!`);
                } else if (mensajePalabra === false) {
                    client.ws.send(`${client.username}: ${message}`);
                }
            }
            if (this.adivinado.length === SocketService.rooms[idSalaDeJuego].size) {
                SocketService.rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws.readyState === ws.OPEN) {
                        client.ws.send(`¡Todos adivinaron la palabra!`);
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
                ws.send(`${index + 1}. ${result.name}: ${result.score}`);
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
                    client.ws.send(`La palabra a dibujar es: ${this.palabraAsignada}`);
                    this.clientWithTurn = this.endTurn(idSalaDeJuego);
                } else {
                    client.ws.send(`¡El juego ha comenzado!`);
                }
                const tiempoLimite = 90;
                let contador = tiempoLimite;
                return new Promise<void>((resolve) => {
                    const intervalo = setInterval(() => {
                        contador--;
                        this.tiempo = contador;
                        if (contador > 0 && this.adivinado.length < this.clientWithTurn.length) {
                            client.ws.send(`Tiempo restante: ${contador} segundos`);
                        } else {
                            clearInterval(intervalo);
                            client.ws.send(`El turno de ${usuario} ha terminado`);
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
                    client.ws.send(`¡Fin del juego!`);
                    client.ws.send("Sala de juego finalizada");
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
            console.log(this.clientWithTurn);
            console.log(SocketService.rooms[idSalaDeJuego]);
            if (SocketService.rooms[idSalaDeJuego].size === 0) {
                delete SocketService.rooms[idSalaDeJuego];
            }
            this.clientWithTurn = this.assignATurn(idSalaDeJuego);
            SocketService.rooms[idSalaDeJuego].forEach(async client => {
                if (client.ws.readyState === ws.OPEN) {
                    client.ws.send(`${userName} ha abandonado a la sala de juego`);
                    const turnoNuevo = await this.playerTurn(idSalaDeJuego, client.ws);
                    client.ws.send(`Tienes el turno ${turnoNuevo}`);
                }
            }
            );
        }
        catch (error) {
            console.error("No hay jugadores en la sala de juego");
        }
    }
}
