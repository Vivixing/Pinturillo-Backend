import { SocketController } from "../controllers/socket.controller";

const express = require('express');
const router = express.Router();

module.exports = (expressWs) => {
    const socketController = new SocketController();
    expressWs.applyTo(router);

    router.ws('/room/:idSalaDeJuego',async (ws, req) => {
        const idSalaDeJuego = req.params.idSalaDeJuego;
        const userName = req.headers.username;
        const sala = await socketController.verifyRoom(idSalaDeJuego, ws);
        if(sala === null){
            return;
        };
        
        await socketController.joinRoom( ws, userName, idSalaDeJuego);
        let turnosJugadores = socketController.assignATurn(idSalaDeJuego);
        
        ws.on('message', async function (msg) {
            const jsonMessage = JSON.parse(msg);
            if (jsonMessage.type === 'SEND_MESSAGE') {
                socketController.sendMessage(jsonMessage.data, idSalaDeJuego, ws)
            }
            else if (jsonMessage.type === 'START_GAME' && SocketController.rooms[idSalaDeJuego].size > 1 && sala.estado === "En curso") {
                await socketController.game(idSalaDeJuego,ws);
            }     
        });

        ws.on('close', function () {
            
        });
    }
    );

    return router;
};