import { Request, Response } from "express";
import { CategoriaService } from "../services/Categoria.service";
import { CategoriaResponse } from "../dto/Categoria.dto";
import { Categoria } from "../entities/Categoria.entity";
import { CategoriaCreationSchema, CategoriaUpdateSchema } from "../schemas/Categoria.schema.js"

export class CategoriaController {

    private categoriaService: CategoriaService = new CategoriaService();

    public getByNombre = async (req: Request, res: Response) => {
        const { nombre } = req.params;
        console.log(nombre);
        try {
            const categoria: CategoriaResponse = await this.categoriaService.encontrarPorNombre(nombre);
            return res.status(200).json({
                categoria,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const categoria: CategoriaResponse = await this.categoriaService.encontrarIdCategoria(id);
            if (categoria === null) {
                res.status(404).json({ error: 'La categoría no existe' });
            }
            res.status(200).json({ categoria });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAllCategoria = async (req: Request, res: Response) => {
        try {
            const categorias: Categoria[] = await this.categoriaService.encontrarTodos();
            return res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public saveCategoria = async (req: Request, res: Response) => {
        const body = req.body;
        const data = CategoriaCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Categoria = await this.categoriaService.guardarCategoria(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public updateCategoria = async (req: Request, res: Response) => {
        const body = req.body;
        const data = CategoriaUpdateSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Categoria = await this.categoriaService.actualizarCategoria(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deleteCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.categoriaService.eliminarCategoria(id);
            res.status(200).json({ message: 'Categoría eliminada' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}