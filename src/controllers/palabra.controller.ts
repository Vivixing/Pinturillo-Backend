import { Request, Response } from "express";
import { PalabraResponse } from "../dto/palabra.dto";
import { Palabra } from "../entities/Palabra.entity";
import { palabraCreationSchema,palabraUpdateSchema } from "../schemas/palabra.schema.js";
import { PalabraService } from "../services/Palabra.service";
export class PalabraController{
    
    private palabraService: PalabraService = new PalabraService();

    public getByPalabra = async (req:Request, res: Response) => {
        const {texto} = req.params;
        try {
            const palabra: PalabraResponse = await this.palabraService.findByPalabra(String(texto));
            return res.status(200).json({
                palabra,
              });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdPalabra = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            console.log('Promise unresolved');
            const palabra: Palabra = await this.palabraService.findByIdPalabra(id);
            if(palabra === null){
                res.status(404).json({ error: 'Palabra no existe'});
            }
            res.status(200).json({palabra});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllPalabras = async (req: Request, res: Response) => {
        try {
            const palabras: Palabra[] = await this.palabraService.getAll();
            return res.status(200).json(palabras);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public savePalabra = async (req: Request, res: Response) => {
        const body = req.body;
        const data = palabraCreationSchema.validate(body);
        if (data.error) {
            return res.status(400).json({ error: data.error.details[0].message });
        }
        try {
            const nuevaPalabra: Palabra = await this.palabraService.save(body);
            return res.status(200).json(nuevaPalabra);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    

    public updatePalabra = async (req: Request, res: Response) => {
        const body = req.body;
        const data = palabraUpdateSchema.validate(body);
        if(data.error){
            res.status(400).json({ error: data.error.details[0].message });
        }
        try {
            const result: Palabra = await this.palabraService.update(body);
            return res.status(200).json(result);
            }catch (error) {
                res.status(400).json({ error: error.message });
            } 
        }

    public deletePalabra = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await this.palabraService.delete(id);
            res.status(200).json({message: 'Palabra eliminada correctamente'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }



}