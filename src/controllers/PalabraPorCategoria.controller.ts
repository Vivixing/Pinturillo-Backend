import { Request, Response } from "express";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";
import { PalabraPorCategoriaResponse } from "../dto/PalabrasPorCategoria.dto";
import {PalabraPorCategoriaCreationSchema, PalabraPorCategoriaUpdateSchema } from "../schemas/PalabrasPorCategoria.schema.js"

import { PalabraPorCategoriaService } from "../services/PalabraPorCategoria.service";

export class PalabraPorCategoriaController {

    private palabraPorCategoriaService: PalabraPorCategoriaService = new PalabraPorCategoriaService();

    public getByIdPalabraPorCategoria = async (req: Request, res: Response) => {
        const idPalabraPorCategoria: number = Number(req.params.idPalabraPorCategoria);

        try {
            const palabraPorCategoria: PalabraPorCategoriaResponse = await this.palabraPorCategoriaService.encontrarIdPalabraPorCategoria(idPalabraPorCategoria);
            if (palabraPorCategoria === null) {
                res.status(404).json({ error: 'La sala de juego existe no existe' });
            }
            res.status(200).json({ palabraPorCategoria });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getByIdCategoria = async (req: Request, res: Response) => {
        const { idCategoria } = req.params;
        try {
            const palabraPorCategoria: PalabraPorCategoriaResponse = await this.palabraPorCategoriaService.encontrarIdCategoria(idCategoria);
            if (palabraPorCategoria === null) {
                res.status(404).json({ error: 'La categoría no existe' });
            }
            res.status(200).json({ palabraPorCategoria });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getByIdPalabra = async (req: Request, res: Response) => {
        const { idPalabra } = req.params;
        try {
            const palabraPorCategoria: PalabraPorCategoriaResponse = await this.palabraPorCategoriaService.encontrarIdPalabra(idPalabra);
            if (palabraPorCategoria === null) {
                res.status(404).json({ error: 'La palabra no existe' });
            }
            res.status(200).json({ palabraPorCategoria });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllPalabraPorCategoria = async (req: Request, res: Response) => {
        try {
            const palabraPorCategoria: PalabraPorCategoria[] = await this.palabraPorCategoriaService.encontrarTodos();
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
            const result: PalabraPorCategoria = await this.palabraPorCategoriaService.guardarPalabraPorCategoria(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deletePalabraPorCategoria = async (req: Request, res: Response) => {
        const idPalabraPorCategoria: number = Number(req.params.idPalabraPorCategoria);
        try {
            await this.palabraPorCategoriaService.eliminarPalabraPorCategoria(idPalabraPorCategoria);
            res.status(200).json({ message: 'palabra por categoria eliminada' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}