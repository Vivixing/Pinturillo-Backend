import { Categoria } from "../entities/Categoria.entity";
import { Palabra } from "../entities/Palabra.entity";

export class PalabraPorCategoriaResponse{
    idPalabra: Palabra;
    idCategoria: Categoria;
}