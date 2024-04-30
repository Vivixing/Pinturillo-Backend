import { Request, Response } from "express";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";

import { PalabraPorCategoriaResponse } from "../dto/PalabrasPorCategoria.dto";
import {PalabraPorCategoriaCreationSchema, PalabraPorCategoriaUpdateSchema } from "../schemas/PalabrasPorCategoria.schema.js"
import { PalabraPorCategoriaService } from "../services/PalabraPorCategoria.service";
import { CategoriaService } from "../services/Categoria.service";
import { PalabraService } from "../services/PalabraService.service";

export class PalabraPorCategoriaaController {

    private palabraPorCategoriaService: PalabraPorCategoriaService = new PalabraPorCategoriaService();
    private categoriaService: CategoriaService = new CategoriaService();
    private palabraService: PalabraService = new PalabraService();

    public getByIdPalabra = async (req: Request, res: Response) => {
        const { palabra } = req.params;
        const idPalabra = await this.palabraService.encontrarIdPalabra(palabra);
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

    public getByIdCategoria = async (req: Request, res: Response) => {
        const { categoria } = req.params;
        const idCategoria = await this.categoriaService.encontrarIdCategoria(categoria);
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

    public getAllSalaDeJuego = async (req: Request, res: Response) => {
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

    public deleteSalaDeJuego = async (req: Request, res: Response) => {
        const { categoria } = req.params;
        const idCategoria = await this.categoriaService.encontrarIdCategoria(categoria);
        const { palabra } = req.params;
        const idPalabra = await this.palabraService.encontrarIdPalabra(palabra);
        try {
            await this.palabraPorCategoriaService.eliminarPalabraPorCategoria(idCategoria, idPalabra);
            res.status(200).json({ message: 'palabra por categoria eliminada' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}