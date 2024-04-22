import { Categoria } from "../entities/Categoria.entity";
import { CategoriaRepository } from "../repositories/Categoria.repository";

export class CategoriaService {

    private categoriaRepository: CategoriaRepository = new CategoriaRepository();

    encontrarTodos(){
        return this.categoriaRepository.getAll()
    }

    encontrarPorNombre(nombre:string){
        return this.categoriaRepository.findByNombre(nombre)
    }

    encontrarIdCategoria(idCategoria:string){
        return this.categoriaRepository.findByIdCategoria(idCategoria)
    }

    async guardarCategoria(categoria:Categoria){
        const nombreExistente = await this.categoriaRepository.findByNombre(categoria.nombre)
        if(nombreExistente){
            throw new Error("Ya existe una categoría con ese nombre")
        }
        return this.categoriaRepository.save(categoria)
    }

    async actualizarCategoria(categoria:Categoria){
        const categoriaExistente = await this.categoriaRepository.findByIdCategoria(categoria.idCategoria)
        if(!categoriaExistente){
            throw new Error("Ninguna categoría corresponde a ese ID")
        }
        const nombreExistente =  await this.categoriaRepository.findByNombre(categoria.nombre)
        if(nombreExistente){
            throw new Error("Ya existe una categoría con ese nombre")
        }
        return this.categoriaRepository.save(categoria)
    }

    async eliminarCategoria(idCategoria:string){
        const categoriaExistente = await this.categoriaRepository.findByIdCategoria(idCategoria)
        if(!categoriaExistente){
            throw new Error("Ninguna categoría corresponde a ese ID")
        }
        return this.categoriaRepository.delete(categoriaExistente)
    }
}