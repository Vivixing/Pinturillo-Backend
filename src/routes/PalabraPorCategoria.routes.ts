import * as express from "express";
import { PalabraPorCategoriaController } from "../controllers/PalabraPorCategoria.controller";

const Router = express.Router();
const palabraPorCategoriaController = new PalabraPorCategoriaController();



Router.get(
    "/palabraPorCategoria/categoria/:idCategoria",
    palabraPorCategoriaController.getByIdCategoria
);

Router.get(
    "/palabraPorCategoria/palabra/:idPalabra",
    palabraPorCategoriaController.getByIdPalabra
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
    "/palabraPorCategoria/:idPalabra/:idCategoria",
    palabraPorCategoriaController.deletePalabraPorCategoria
)

export { Router as PalabraPorCategoriaRouter };