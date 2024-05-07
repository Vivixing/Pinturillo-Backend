import { Request, Response } from "express";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";
import { PalabraPorCategoriaCreationSchema, PalabraPorCategoriaUpdateSchema } from "../schemas/PalabrasPorCategoria.schema.js"

import { PalabraPorCategoriaService } from "../services/PalabraPorCategoria.service";

export class PalabraPorCategoriaController {

    private palabraPorCategoriaService: PalabraPorCategoriaService = new PalabraPorCategoriaService();


    public getByIdCategoria = async (req: Request, res: Response) => {
        const { idCategoria } = req.params;
        try {
            let palabraPorCategoria: PalabraPorCategoria[] = await this.palabraPorCategoriaService.encontrarIdCategoria(idCategoria);
            if (palabraPorCategoria === null) {
                res.status(404).json({ error: 'La categorÃa no existe' });
            }
            palabraPorCategoria = await this.palabraPorCategoriaService.asignarPalabrayCategoria(palabraPorCategoria);
            res.status(200).json({ palabraPorCategoria });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getByIdPalabra = async (req: Request, res: Response) => {
        const { idPalabra } = req.params;
        try {
            let palabraPorCategoria: PalabraPorCategoria[] = await this.palabraPorCategoriaService.encontrarIdPalabra(idPalabra);
            if (palabraPorCategoria === null) {
                res.status(404).json({ error: 'La palabra no existe' });
            }
            palabraPorCategoria = await this.palabraPorCategoriaService.asignarPalabrayCategoria(palabraPorCategoria);
            res.status(200).json({ palabraPorCategoria });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllPalabraPorCategoria = async (req: Request, res: Response) => {
        try {
            let palabraPorCategoria: PalabraPorCategoria[] = await this.palabraPorCategoriaService.encontrarTodos();
            palabraPorCategoria = await this.palabraPorCategoriaService.asignarPalabrayCategoria(palabraPorCategoria);
            return res.status(200).json(palabraPorCategoria);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public savePalabraPorCategoria = async (req: Request, res: Response) => {
        const body = req.body;
        const data = PalabraPorCategoriaCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            let result: PalabraPorCategoria = await this.palabraPorCategoriaService.guardarPalabraPorCategoria(body);
            result = await this.palabraPorCategoriaService.asignarPalabrayCategoria(result);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deletePalabraPorCategoria = async (req: Request, res: Response) => {
        const { idPalabra } = req.params;
        const { idCategoria } = req.params;
        try {
            await this.palabraPorCategoriaService.eliminarPalabraPorCategoria(idPalabra, idCategoria);
            res.status(200).json({ message: 'palabra por categoria eliminada' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}
