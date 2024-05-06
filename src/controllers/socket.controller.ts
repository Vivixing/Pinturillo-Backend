import { PalabraResponse } from "../dto/palabra.dto";
import { PalabraPorCategoriaRepository } from "../repositories/PalabraPorCategoria.repository";
import { SalaDeJuegoRepository } from "../repositories/SalaDeJuego.repository";
import { PalabraRepository } from "../repositories/palabra.repository";

const WebSocket = require('ws');

export class SocketController{
    public static  rooms = {};
    public clientWithTurn = [];
    public palabraAsignada = "";

    async joinRoom(ws, idSalaDeJuego) {
      if (!SocketController.rooms[idSalaDeJuego]) {
        SocketController.rooms[idSalaDeJuego] = new Set();
      }
      SocketController.rooms[idSalaDeJuego].add(ws);
      }
      
      leaveRoom(ws, idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
            SocketController.rooms[idSalaDeJuego].delete(ws);
          if (SocketController.rooms[idSalaDeJuego].size === 0) {
            delete SocketController.rooms[idSalaDeJuego];
          }
          for (const client of this.clientWithTurn) {
            if (client.client === ws) {
              const indice = this.clientWithTurn.indexOf(client);
              this.clientWithTurn = this.clientWithTurn.splice(indice, 1);
            }
          }
          this.assignATurn(idSalaDeJuego);
        }
      }
      
      guessWord(idSalaDeJuego, message) {
        if (SocketController.rooms[idSalaDeJuego]) {
          for (const client of SocketController.rooms[idSalaDeJuego]) {
            if(message === this.palabraAsignada){
              return true;
            }
            return false;
        }
      }
    }
      assignATurn(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const clients = Array.from(SocketController.rooms[idSalaDeJuego]);
          for (const client of clients) {
            const turno = Math.floor(clients.indexOf(client))+1;
            this.clientWithTurn.push({client, turno});
          }
          return this.clientWithTurn;
        }
      }
      
        playerTurn(idSalaDeJuego, ws) {
        if (SocketController.rooms[idSalaDeJuego]) {
        for (const client of this.clientWithTurn) {
            if (client.client === ws) {
              return client.turno;
            }
          }
        }
      }
      async asignWord(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const salaDeJuego = new SalaDeJuegoRepository();
          const sala = await (salaDeJuego.findByIdSalaDeJuego(idSalaDeJuego));
          const categoria = sala.idCategoria;
          
          const PalabraPorCategoria = new PalabraPorCategoriaRepository();
          const palabras = await PalabraPorCategoria.findByIdCategoria(categoria);
          const randomIndex = Math.floor(Math.random() * palabras.length);
          const randomWord = palabras[randomIndex];
          
          const palabra = new PalabraRepository();
          const palabraSeleccionada: PalabraResponse = await palabra.findByIdPalabra(randomWord.idPalabra);
          this.palabraAsignada = palabraSeleccionada.texto;
          return this.palabraAsignada;
        }
        return null;
      }

      async points(idSalaDeJuego, puesto) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const clients = Array.from(SocketController.rooms[idSalaDeJuego]);
            const scoreFrontPosition = (clients.length - puesto) * 10;
            const maxTime = 90;
            const timeScoreFactor = Math.max(0, 1 - (maxTime));
            const scoreFrontTime = Math.floor(timeScoreFactor * 1000);
            const totalScore = scoreFrontPosition + scoreFrontTime;
            return totalScore;
        }
        return false;
      }
    
      endTurn(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const finTurno = this.clientWithTurn.shift()
          SocketController.rooms[idSalaDeJuego].delete(finTurno.ws);
          SocketController.rooms[idSalaDeJuego].add(finTurno.ws);
          return this.assignATurn(idSalaDeJuego);
        }
      }
      endGame(roomName){
        if (SocketController.rooms[roomName]){
          const clients = Array.from(SocketController.rooms[roomName]);
          const results = clients.map((client: any)=>{
            return {
              name: client.name,
              score: client.score
            };
          });
          results.sort((a: any,b: any)=> b.score-a.score);
          console.log("results");
          results.forEach((result: any, index: number)=>{
            console.log(`${index + 1}. ${result.name}: ${result.score}`);
          });
        }
      }
}
