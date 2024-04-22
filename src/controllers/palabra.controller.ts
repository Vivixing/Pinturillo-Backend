import { Request, Response } from "express";
import { PalabraResponse } from "../dto/palabra.dto";
import { PalabraRepository } from "../repositories/palabra.repository";
import { Palabra } from "../entities/Palabra.entity";
import { palabraCreationSchema,palabraUpdateSchema } from "../schemas/palabra.schema.js";

import { v4 as uuidv4 } from 'uuid';


export class PalabraController{
    
    private palabraRepository: PalabraRepository = new PalabraRepository();

    public getByPalabra = async (req: Request, res: Response) => {
        try {
            const texto = <string>req.query.texto;
            console.log(texto);
            const palabra: PalabraResponse = await this.palabraRepository.findByPalabra(texto);
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
            const palabra: Palabra = await this.palabraRepository.findByIdPalabra(id);
            if(palabra === null){
                res.status(404).json({ error: 'Palabra no existe'});
            }
            res.status(200).json({palabra});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllPalabras = async (res: Response) => {
        try {
            const palabras: Palabra[] = await this.palabraRepository.getAll();
            return res.status(200).json(palabras);
        } catch (error) {
             res.status(400).json({ error: error.message });
       }
    }

    public savePalabra = async (req: Request, res: Response) => {
        const body = req.body;
        const data = palabraCreationSchema.validate(body);
        if(data.error){
            res.status(400).json({ error: data.error.details[0].message });
        }
        try {
            const id = uuidv4();
            body['id']= id;
            const nuevaPalabra: Palabra = await this.palabraRepository.save(body);
            return res.status(200).json(nuevaPalabra);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public updatePalabra = async (req: Request, res: Response) => {
        const body = req.body;
        const data = palabraUpdateSchema.validate(body);
        if(data.error){
            res.status(400).json({ error: data.error.details[0].message });
        }
        try {
            const id = body.id;
            let palabraToUpdate: Palabra = await this.palabraRepository.findByIdPalabra(id);
            palabraToUpdate = {
                ...body
            } 
            const result: Palabra = await this.palabraRepository.save(palabraToUpdate);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deletePalabra = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await this.palabraRepository.delete(id);
            res.status(200).json({message: 'Palabra eliminada correctamente'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }



}