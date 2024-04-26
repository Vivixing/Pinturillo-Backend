import * as express from "express";
import { CategoriaController } from "../controllers/Categoria.controller";

const Router = express.Router();
const categoriaController = new CategoriaController();

Router.get(
    "/categoria/:nombre",
    categoriaController.getByNombre
);

Router.get(
    "/categoria/:id",
    categoriaController.getByIdCategoria
);

Router.get(
    "/categorias",
    categoriaController.getAllCategoria
);

Router.post(
    "/categoria",
    categoriaController.saveCategoria
);

Router.put(
    "/categoria",
    categoriaController.updateCategoria
)

Router.delete(
    "/categoria/:id",
    categoriaController.deleteCategoria
)

export { Router as categoriaRouter };