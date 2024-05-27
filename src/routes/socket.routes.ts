import { SocketController } from "../controllers/socket.controller";
import { SocketService } from "../services/socket.service";

const express = require('express');
const router = express.Router();

module.exports = (expressWs) => {
    const socketController = new SocketController();
    expressWs.applyTo(router);

    router.ws('/room/:idSalaDeJuego/:username',async (ws, req) => {
        const idSalaDeJuego = req.params.idSalaDeJuego;
        const userName = req.params.username;
        const sala = await socketController.verifyRoom(idSalaDeJuego, ws);
        if(sala === null){
            return;
        };
        
        await socketController.joinRoom( ws, userName, idSalaDeJuego);    
        ws.on('message', async function (msg) {
            const jsonMessage = JSON.parse(msg);
            if (jsonMessage.type === 'SEND_MESSAGE') {
                socketController.sendMessage(jsonMessage.data, idSalaDeJuego, ws)
            }
            else if (jsonMessage.type === 'START_GAME' && SocketService.rooms[idSalaDeJuego].size > 1 && sala.estado === "En curso") {
                await socketController.game(idSalaDeJuego,ws);
            }     
        });

        ws.on('close', function() {
            socketController.leave(ws, idSalaDeJuego, userName);
    })
    });
    

    return router;
};