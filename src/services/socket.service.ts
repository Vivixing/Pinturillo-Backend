import { PalabraResponse } from "../dto/palabra.dto";
import { SocketRepository } from "../repositories/socket.repository";


export class SocketService{
    public static rooms = {};
    public clientWithTurn = [];
    public palabraAsignada = "";
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
        try{
            const sala = await this.verifyRoom(idSalaDeJuego)
            sala.estado = "Finalizado";
            await this.socketRepository.updateRoom(sala)
        }catch(error){
            throw new Error("Error al acceder a la sala")
        }
        
    }

    async joinRoom(ws, username, idSalaDeJuego) {
        if (!SocketService.rooms[idSalaDeJuego]) {
            SocketService.rooms[idSalaDeJuego] = new Set();
        }
        SocketService.rooms[idSalaDeJuego].add({ ws, username, puntos: 0 });
        return SocketService.rooms[idSalaDeJuego]
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
            return results
            results.forEach((result: any, index: number) => {
                ws.send(`${index + 1}. ${result.name}: ${result.score}`);
            });
        }
    }
}
