import { SocketService } from "../services/socket.service";

const WebSocket = require('ws');

export class SocketController {
  public socketService = new SocketService
  public static rooms = SocketService.rooms
  public static adivinado = []
  public tiempo = 0;
  public palabraAsignada = "";
  public maxRondas = 1
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
    SocketController.rooms[idSalaDeJuego] = await this.socketService.joinRoom(ws, username, idSalaDeJuego)
    this.welcomeRoom(idSalaDeJuego, ws, username)
  }

  async welcomeRoom(idSalaDeJuego, ws, username) {
    const turnosJugadores = this.assignATurn(idSalaDeJuego)
    const turnoJugador = await this.playerTurn(idSalaDeJuego, ws);
    SocketController.rooms[idSalaDeJuego].forEach(client => {
      if (client.ws == ws) {
        client.ws.send(`Tienes el turno ${turnoJugador}`);
      }
      if (SocketController.rooms[idSalaDeJuego].size === 1) {
        SocketController.rooms[idSalaDeJuego].forEach(client => {
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
  async leaveRoom(ws, idSalaDeJuego) {
    SocketController.rooms[idSalaDeJuego] = await this.socketService.leaveRoom(ws, idSalaDeJuego)
    return SocketController.rooms[idSalaDeJuego]
  }
  sendMessage(message, idSalaDeJuego, ws) {
    SocketController.rooms[idSalaDeJuego].forEach(async client => {
      const mensajePalabra = this.guessWord(idSalaDeJuego, message);

      if (client.ws == ws && client.ws.readyState === ws.OPEN && mensajePalabra && SocketController.adivinado.includes(client.ws) === false) {
        client.ws.send(`¡Adivinaste la palabra :D!`);
        SocketController.adivinado.push(client.ws);
        const puntos = await this.points(idSalaDeJuego, SocketController.length - 1, ws, this.tiempo);
        client.ws.send(`Conseguiste ${puntos} puntos`);
      }
      if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
        if (mensajePalabra) {
          client.ws.send(`¡¡${client.username} ha adivinado la palabra!!`);
        } else if (mensajePalabra === false) {
          client.ws.send(`${client.username}: ${message}`);
        }
      }
      if (SocketController.adivinado.length === SocketController.rooms[idSalaDeJuego].size) {
        SocketController.rooms[idSalaDeJuego].forEach(client => {
          if (client.ws.readyState === ws.OPEN) {
            client.ws.send(`¡Todos adivinaron la palabra!`);
          }
        });
      }
    });
  }
  guessWord(idSalaDeJuego, message) {
    if (this.socketService.guessWord(idSalaDeJuego, message)) {
      return true
    }
    return false
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
    results.sort((a: any, b: any) => b.score - a.score);
    results.forEach((result: any, index: number) => {
      ws.send(`${index + 1}. ${result.name}: ${result.score}`);
    });
  }

  async game(idSalaDeJuego, ws) {
    try {
      this.palabraAsignada = await this.asignWord(idSalaDeJuego);
      const clientes = Array.from(SocketController.rooms[idSalaDeJuego]);
      let usuario = "";
      const promises = clientes.map(async (client: any) => {
        const turno = await this.playerTurn(idSalaDeJuego, client.ws);
        if (client.ws.readyState === ws.OPEN && turno === 1) {
          usuario = client.username;
          SocketController.adivinado.push(client.ws);
          client.ws.send(`La palabra a dibujar es: ${this.palabraAsignada}`);
          this.turnosJugadores = this.endTurn(idSalaDeJuego);
        } else {
          client.ws.send(`¡El juego ha comenzado!`);
        }
        const tiempoLimite = 90;
        let contador = tiempoLimite;
        return new Promise<void>((resolve) => {
          const intervalo = setInterval(() => {
            contador--;
            this.tiempo = contador;
            if (contador > 0 && SocketController.adivinado.length < this.turnosJugadores.length) {
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
      SocketController.adivinado = [];
      return await this.game(idSalaDeJuego, ws);
    }
    else {
      SocketController.rooms[idSalaDeJuego].forEach(client => {
        if (client.ws.readyState === ws.OPEN) {
          this.endGame(idSalaDeJuego, client.ws);
          client.ws.send(`¡Fin del juego!`);
          client.ws.send("Sala de juego finalizada");
        }
        SocketController.adivinado = [];
        this.palabraAsignada = "";
        this.closeRoom(idSalaDeJuego);
      });
    };
  }
  leave(idSalaDeJuego, ws){
    try{
      SocketController.rooms[idSalaDeJuego].delete(ws);
      if (SocketController.rooms[idSalaDeJuego].size === 0) {
          delete SocketController.rooms[idSalaDeJuego];
      }
      this.leaveRoom(ws, idSalaDeJuego);
      this.turnosJugadores = this.assignATurn(idSalaDeJuego);
  
      SocketController.rooms[idSalaDeJuego].forEach(async client => {
          if (client.ws.readyState === ws.OPEN) {
              client.ws.send(`${ws.username} ha abandonado a la sala de juego`);
              const turnoNuevo = await this.playerTurn(idSalaDeJuego, client.ws);
              client.ws.send(`Tienes el turno ${turnoNuevo}`);
          }
      }
  );
  }
  catch(error){
      console.error("No hay jugadores en la sala de juego");
  }
  }
}
