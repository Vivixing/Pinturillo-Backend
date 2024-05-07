import { Request, Response } from "express";
import { SalaDeJuego } from "../entities/SalaDeJuego.entity";
import { SalaDeJuegoService } from "../services/SalaDeJuego.service";
import { SalaDeJuegoResponse } from "../dto/SalaDeJuego.dto";
import { SalaDeJuegoCreationSchema, SalaDeJuegoUpdateSchema } from "../schemas/SalaDeJuego.schema.js"
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";

export class SalaDeJuegoController {

    private salaDeJuegoService: SalaDeJuegoService = new SalaDeJuegoService();


    public getByNombre = async (req: Request, res: Response) => {
        const { nombre } = req.params;
        console.log(nombre);
        try {
            let salaDeJuego: SalaDeJuegoResponse = await this.salaDeJuegoService.encontrarPorNombre(nombre);
            salaDeJuego = await this.salaDeJuegoService.asignarCategoria(salaDeJuego);
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
            let salaDeJuego: SalaDeJuegoResponse = await this.salaDeJuegoService.encontrarIdSalaDeJuego(idSalaDeJuego);
            if (salaDeJuego === null) {
                res.status(404).json({ error: 'La sala de juego existe no existe' });
            }
            salaDeJuego = await this.salaDeJuegoService.asignarCategoria(salaDeJuego);
            res.status(200).json({ salaDeJuego });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getByIdCategoria = async (req: Request, res: Response) => {
        const { idCategoria } = req.params;
        try {
            let salaDeJuego: SalaDeJuegoResponse = await this.salaDeJuegoService.encontrarIdCategoria(idCategoria);
            if (salaDeJuego === null) {
                res.status(404).json({ error: 'La categorÃ­a no existe' });
            }
            salaDeJuego = await this.salaDeJuegoService.asignarCategoria(salaDeJuego);
            res.status(200).json({ salaDeJuego });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllSalaDeJuego = async (req: Request, res: Response) => {
        try {
            let salasDeJuego: SalaDeJuego[] = await this.salaDeJuegoService.encontrarTodos();
            salasDeJuego = await this.salaDeJuegoService.asignarCategoria(salasDeJuego);
            return res.status(200).json(salasDeJuego);
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
            let result: SalaDeJuego = await this.salaDeJuegoService.guardarSalaDeJuego(body);
            result = await this.salaDeJuegoService.asignarCategoria(result);
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
            let result: SalaDeJuego = await this.salaDeJuegoService.actualizarSalaDeJuego(body);
            result = await this.salaDeJuegoService.asignarCategoria(result);
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

    public getPalabras = async (req: Request, res: Response) => {
        const idSalaDeJuego: number = Number(req.params.idSalaDeJuego);
        try {
            const palabras: PalabraPorCategoria[] = await this.salaDeJuegoService.palabrasSalaDeJuego(idSalaDeJuego);
            return res.status(200).json(palabras);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}