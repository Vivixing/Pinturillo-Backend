const express = require('express');
const router = express.Router();
const { SalaDeJuegoRepository } = require('../repositories/SalaDeJuego.repository');

module.exports = (expressWs) => {
    const salaDeJuegoRepository = new SalaDeJuegoRepository();
    const rooms = {}; // Initialize rooms object

    expressWs.applyTo(router);

    router.ws('/room/:idSalaDeJuego', (ws, req) => {
        const idSalaDeJuego = req.params.idSalaDeJuego;
        const userName = req.headers.username;

        if (!rooms[idSalaDeJuego]) {
            rooms[idSalaDeJuego] = new Set();
        }
        rooms[idSalaDeJuego].add({ ws, userName });

        // Notify all users in the room that a new user has joined
        rooms[idSalaDeJuego].forEach(client => {
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                client.ws.send(`${userName} has joined`);
            }
        });

        ws.on('message', async function (msg) {
            const jsonMessage = JSON.parse(msg);
            if (jsonMessage.type === 'SEND_MESSAGE') {
                rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                        client.ws.send(`${userName} Says: ${jsonMessage.data}`);
                    }
                });
            } else if (jsonMessage.type === 'FINISH_TURN') {
                const songs = await salaDeJuegoRepository.getAll();
                rooms[idSalaDeJuego].forEach(client => {
                    if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                        client.ws.send(JSON.stringify(songs));
                    }
                });
            }

        });

        ws.on('close', function () {
            rooms[idSalaDeJuego].delete(ws);
            if (rooms[idSalaDeJuego].size === 0) {
                delete rooms[idSalaDeJuego];
            }
        });
    });

    return router;
};
