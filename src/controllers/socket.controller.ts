import { PalabraResponse } from "../dto/palabra.dto";
import { PalabraPorCategoriaRepository } from "../repositories/PalabraPorCategoria.repository";
import { SalaDeJuegoRepository } from "../repositories/SalaDeJuego.repository";
import { PalabraService } from "../services/PalabraService.service";


const WebSocket = require('ws');

export class SocketController{
    public static  rooms = {};
    public clientWithTurn = [];
    public palabraAsignada = "";
    public salaDeJuegoRepository = new SalaDeJuegoRepository();

    async verifyRoom(idSalaDeJuego, ws){
      try{
      const sala= await this.salaDeJuegoRepository.findByIdSalaDeJuego(idSalaDeJuego)
        if (sala === null){
        ws.send("Sala de juego no encontrada");
        ws.close();
        return null;
        }
        sala.estado = "En curso";
        await this.salaDeJuegoRepository.save(sala);
        return sala;
      }catch(error){
        ws.send("Número de sala de juego no válido");
        ws.close();
        return null;
      }
    }

    async closeRoom(idSalaDeJuego){
        const sala = await this.salaDeJuegoRepository.findByIdSalaDeJuego(idSalaDeJuego);
        sala.estado = "Finalizado";
        await this.salaDeJuegoRepository.save(sala);
    }
    async joinRoom(ws, username, idSalaDeJuego) {
      if (!SocketController.rooms[idSalaDeJuego]) {
        SocketController.rooms[idSalaDeJuego] = new Set();
      }
      SocketController.rooms[idSalaDeJuego].add({ws, username, puntos: 0});
      }
      
      leaveRoom(ws, idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const clientToDelete = Array.from(SocketController.rooms[idSalaDeJuego]).find((client: any) => client.ws === ws);
          SocketController.rooms[idSalaDeJuego].delete(clientToDelete);
          if (SocketController.rooms[idSalaDeJuego].size === 0) {
            delete SocketController.rooms[idSalaDeJuego];
          }
          this.clientWithTurn = [];
        }
      }
      
      guessWord(idSalaDeJuego, message) {
        if (SocketController.rooms[idSalaDeJuego]) {
            if(message.toLowerCase() === this.palabraAsignada.toLowerCase()){
              return true;
            }
            return false;
        }
      }
  
      assignATurn(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          this.clientWithTurn = [];
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
            if (client.client.ws === ws) {
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
          
          
          const palabra = new PalabraService();
          const palabraSeleccionada: PalabraResponse = await palabra.encontrarIdPalabra(randomWord.idPalabra);
          this.palabraAsignada = palabraSeleccionada.texto;
          return this.palabraAsignada;
        }
        return null;
      }

      async points(idSalaDeJuego, puesto, ws, tiempo) {
        if (SocketController.rooms[idSalaDeJuego]) {
          for (const client of SocketController.rooms[idSalaDeJuego]) {
            if (client.ws === ws) {
              const scoreFrontPosition = (SocketController.rooms[idSalaDeJuego].size - puesto) * 10;
              const maxTime = 90;
              const timeScoreFactor = Math.max(0, 1 - ((maxTime-tiempo) / maxTime));
              const scoreFrontTime = Math.floor(timeScoreFactor*100);
              const totalScore = scoreFrontPosition + scoreFrontTime;
              client.puntos += totalScore;
              return totalScore;
            }
        }
      }
    }
    
      endTurn(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          for (const client of this.clientWithTurn) {
            if(client.turno == 1){
              client.turno = SocketController.rooms[idSalaDeJuego].size;
            }else{
              client.turno--;
            }
          }
          return this.clientWithTurn;
        }
      }
      endGame(idSalaDeJuego, ws){
        this.palabraAsignada = "";
        if (SocketController.rooms[idSalaDeJuego]) {
          const clients = Array.from(SocketController.rooms[idSalaDeJuego]);
          const results = clients.map((client: any)=>{
            return {
              name: client.username,
              score: client.puntos
            };
          });
          results.sort((a: any,b: any)=> b.score-a.score);
          results.forEach((result: any, index: number)=>{
            ws.send(`${index + 1}. ${result.name}: ${result.score}`);
          });
        }
      }
}
