import { Request, Response } from "express";
import { CategoriaService } from "../services/Categoria.service";
import { CategoriaResponse } from "../dto/Categoria.dto";
import { Categoria } from "../entities/Categoria.entity";
import { CategoriaCreationSchema, CategoriaUpdateSchema } from "../schemas/Categoria.schema.js"
import { SalaDeJuego } from "../entities/SalaDeJuego.entity";
import { SalaDeJuegoService } from "../services/SalaDeJuego.service";
import { SalaDeJuegoResponse } from "../dto/SalaDeJuego.dto";
import {SalaDeJuegoCreationSchema, SalaDeJuegoUpdateSchema } from "../schemas/SalaDeJuego.schema.js"

export class SalaDeJuegoController {

    private salaDeJuegoService: SalaDeJuegoService = new SalaDeJuegoService();
    

    public getByNombre = async (req: Request, res: Response) => {
        const { nombre } = req.params;
        console.log(nombre);
        try {
            const salaDeJuego: SalaDeJuegoResponse = await this.salaDeJuegoService.encontrarPorNombre(nombre);
            return res.status(200).json({
                salaDeJuego,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdSalaDeJuego = async (req: Request, res: Response) => {
        const idSalaDeJuego: number = Number(req.params.idSalaDeJuego);

        try {
            const salaDeJuego: SalaDeJuegoResponse = await this.salaDeJuegoService.encontrarIdSalaDeJuego(idSalaDeJuego);
            if (salaDeJuego === null) {
                res.status(404).json({ error: 'La sala de juego existe no existe' });
            }
            res.status(200).json({ salaDeJuego });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getByIdCategoria = async (req: Request, res: Response) => {
        const { idCategoria } = req.params;
        try {
            const salaDeJuego: SalaDeJuegoResponse = await this.salaDeJuegoService.encontrarIdCategoria(idCategoria);
            if (salaDeJuego === null) {
                res.status(404).json({ error: 'La categoría no existe' });
            }
            res.status(200).json({ salaDeJuego });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllSalaDeJuego = async (req: Request, res: Response) => {
        try {
            const salaDeJuego: SalaDeJuego[] = await this.salaDeJuegoService.encontrarTodos();
            return res.status(200).json(salaDeJuego);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public saveSalaDeJuego = async (req: Request, res: Response) => {
        const body = req.body;
        const data = SalaDeJuegoCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: SalaDeJuego = await this.salaDeJuegoService.guardarSalaDeJuego(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public updateSalaDeJuego = async (req: Request, res: Response) => {
        const body = req.body;
        const data = SalaDeJuegoUpdateSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: SalaDeJuego = await this.salaDeJuegoService.actualizarSalaDeJuego(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deleteSalaDeJuego = async (req: Request, res: Response) => {
        const idSalaDeJuego: number = Number(req.params.idSalaDeJuego);
        try {
            await this.salaDeJuegoService.eliminarSalaDeJuego(idSalaDeJuego);
            res.status(200).json({ message: 'sala de juego eliminada' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}