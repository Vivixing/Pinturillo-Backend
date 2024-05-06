const WebSocket = require('ws');

export class SocketController {
  public static rooms = {};
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
        if (message === this.palabraAsignada) {
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
        const turno = Math.floor(clients.indexOf(client)) + 1;
        this.clientWithTurn.push({ client, turno });
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
}