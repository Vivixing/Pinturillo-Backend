import { SocketController } from "../controllers/socket.controller";

const express = require('express');
const router = express.Router();

module.exports = (expressWs) => {
    const socketController = new SocketController();
    expressWs.applyTo(router);

    router.ws('/room/:idSalaDeJuego/:username/:avatar',async (ws, req) => {
        const idSalaDeJuego = req.params.idSalaDeJuego;
        const userName = req.params.username;
        const avatar = req.params.avatar;
        const sala = await socketController.verifyRoom(idSalaDeJuego, ws);
        if(sala === null){
            return;
        };
        
        await socketController.joinRoom( ws, userName, idSalaDeJuego, avatar);
        socketController.obtainPlayers(idSalaDeJuego, ws);    
        ws.on('message', async function (msg) {
                socketController.message(ws, msg, idSalaDeJuego, userName, sala, avatar);
        });

        ws.on('close', function() {
            socketController.leave(ws, idSalaDeJuego, userName);
    })
    });
    

    return router;
};