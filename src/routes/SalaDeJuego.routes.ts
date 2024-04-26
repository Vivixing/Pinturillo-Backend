import * as express from "express";
import { SalaDeJuegoController } from "../controllers/SalaDeJuego.controller";

const Router = express.Router();
const salaDeJuegoController = new SalaDeJuegoController();

Router.get(
    "/salaDeJuego/:nombre",
    salaDeJuegoController.getByNombre
);

Router.get(
    "/salaDeJuego/categoria/:idCategoria",
    salaDeJuegoController.getByIdCategoria
);

Router.get(
    "/salaDeJuego/:idSalaDeJuego",
    salaDeJuegoController.getByIdSalaDeJuego
);

Router.get(
    "/salasDeJuego",
    salaDeJuegoController.getAllSalaDeJuego
);

Router.post(
    "/salaDeJuego",
    salaDeJuegoController.saveSalaDeJuego
);

Router.put(
    "/salaDeJuego",
    salaDeJuegoController.updateSalaDeJuego
)

Router.delete(
    "/salaDeJuego/:idSalaDeJuego",
    salaDeJuegoController.deleteSalaDeJuego
)

export { Router as SalaDeJuegoRouter };