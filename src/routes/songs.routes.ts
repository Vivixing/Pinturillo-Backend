import * as express from "express";
import { PalabraController } from "../controllers/palabra.controller";

const Router = express.Router();
const palabraController = new PalabraController();
Router.get(
    "/palabra",
    palabraController.getByPalabra
  );

  Router.get(
    "/palabra/:id",
    palabraController.getByIdPalabra
  );

  Router.get(
    "/palabras",
    palabraController.getAllPalabras
  );

  Router.post(
    "/palabra",
    palabraController.savePalabra
  );

  Router.put(
    "/palabra",
    palabraController.updatePalabra
  )

  Router.delete(
    "/palabra/:id",
    palabraController.deletePalabra
  )
  export { Router as palabraRouter };