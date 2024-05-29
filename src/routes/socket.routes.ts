import { SocketController } from "../controllers/socket.controller";

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
        socketController.obtainPlayers(idSalaDeJuego, ws);    
        ws.on('message', async function (msg) {
                socketController.message(ws, msg, idSalaDeJuego, userName, sala);
        });

        ws.on('close', function() {
            socketController.leave(ws, idSalaDeJuego, userName);
    })
    });
    

    return router;
};