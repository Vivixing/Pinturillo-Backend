import * as express from "express";
import { PalabraPorCategoriaController } from "../controllers/PalabraPorCategoria.controller";

const Router = express.Router();
const palabraPorCategoriaController = new PalabraPorCategoriaController();



Router.get(
    "/palabraPorCategoria/categoria/:idCategoria",
    palabraPorCategoriaController.getByIdCategoria
);

Router.get(
    "/palabraPorCategoria/:idPalabraPorCategoria",
    palabraPorCategoriaController.getByIdPalabraPorCategoria
);

Router.get(
    "/palabraPorCategoria",
    palabraPorCategoriaController.getAllPalabraPorCategoria
);

Router.post(
    "/palabraPorCategoria",
    palabraPorCategoriaController.savePalabraPorCategoria
);


Router.delete(
    "/palabraPorCategoria/:idPalabraPorCategoria",
    palabraPorCategoriaController.deletePalabraPorCategoria
)

export { Router as SalaDeJuegoRouter };