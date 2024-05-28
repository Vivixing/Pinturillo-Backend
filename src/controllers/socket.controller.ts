import { SocketService } from "../services/socket.service";

const WebSocket = require('ws');

export class SocketController {
  public socketService = new SocketService
  public turnosJugadores = []
  async verifyRoom(idSalaDeJuego, ws) {
    try {
      const sala = await this.socketService.verifyRoom(idSalaDeJuego)
      return sala;
    }
    catch (error) {
      ws.send(error.message);
      ws.close();
      return null;
    }
  }

  async closeRoom(idSalaDeJuego) {
    return await this.socketService.closeRoom(idSalaDeJuego)
  }
  async joinRoom(ws, username, idSalaDeJuego) {
    await this.socketService.joinRoom(ws, username, idSalaDeJuego)
    this.welcomeRoom(idSalaDeJuego, ws, username)
  }

  async welcomeRoom(idSalaDeJuego, ws, username) {
    this.socketService.welcomeRoom(idSalaDeJuego, ws, username)
  }

  async leaveRoom(ws, idSalaDeJuego) {
    this.socketService.leaveRoom(ws, idSalaDeJuego)
  }
  sendMessage(message, idSalaDeJuego, ws, username) {
    this.socketService.sendMessage(message, idSalaDeJuego, ws, username)
  }
  guessWord(idSalaDeJuego, message) {
    if (this.socketService.guessWord(idSalaDeJuego, message)) {
      return true
    }
    return false
  }
  obtainPlayers(idSalaDeJuego, ws) {
    return this.socketService.obtainPlayers(idSalaDeJuego, ws)
  }
  assignATurn(idSalaDeJuego) {
    this.turnosJugadores = this.socketService.assignATurn(idSalaDeJuego)
    return this.turnosJugadores
  }

  playerTurn(idSalaDeJuego, ws) {
    return this.socketService.playerTurn(idSalaDeJuego, ws)
  }
  async asignWord(idSalaDeJuego) {
    return this.socketService.asignWord(idSalaDeJuego)
  }

  async points(idSalaDeJuego, puesto, ws, tiempo) {
    return this.socketService.points(idSalaDeJuego, puesto, ws, tiempo)
  }

  endTurn(idSalaDeJuego) {
    return this.socketService.endTurn(idSalaDeJuego)
  }
  endGame(idSalaDeJuego, ws) {
    const results = this.socketService.endGame(idSalaDeJuego, ws)
  }

  async game(idSalaDeJuego, ws) {
    this.socketService.game(idSalaDeJuego, ws)
  }

  async finishTurn(idSalaDeJuego, ws) {
    this.socketService.finishTurn(idSalaDeJuego, ws)
  }

  async leave(ws, idSalaDeJuego, userName) {
    await this.socketService.leave(ws, idSalaDeJuego, userName)
  }
}
