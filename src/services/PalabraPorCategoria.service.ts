import { Categoria } from "../entities/Categoria.entity";
import { Palabra } from "../entities/Palabra.entity";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";
import { CategoriaRepository } from "../repositories/Categoria.repository";
import { PalabraPorCategoriaRepository } from "../repositories/PalabraPorCategoria.repository";
import { PalabraRepository } from "../repositories/palabra.repository";

export class PalabraPorCategoriaService {

    private palabraPorCategoriaRepository: PalabraPorCategoriaRepository = new PalabraPorCategoriaRepository();
    private categoriaRepository: CategoriaRepository = new CategoriaRepository();
    private palabraRepository: PalabraRepository = new PalabraRepository();

    encontrarTodos() {
        return this.palabraPorCategoriaRepository.getAll()
    }

    encontrarIdCategoria(idCategoria: Categoria) {
        return this.palabraPorCategoriaRepository.findByIdCategoria(idCategoria)
    }
    
    encontrarIdPalabra(idPalabra: Palabra) {
        return this.palabraPorCategoriaRepository.findByIdPalabra(idPalabra)
    }

    async guardarPalabraPorCategoria(palabraPorCategoria: PalabraPorCategoria) {
        try {
            await this.validaciones(palabraPorCategoria);
            return this.palabraPorCategoriaRepository.save(palabraPorCategoria);
        } catch (error) { 
            throw error;
        }
    }

    async validaciones(palabraPorCategoria: PalabraPorCategoria) {
        const categoriaExistente = await this.categoriaRepository.findByIdCategoria(palabraPorCategoria.idCategoria.idCategoria)
        const palabraExistente = await this.palabraRepository.findByIdPalabra(palabraPorCategoria.idPalabra.idPalabra)
        if (!categoriaExistente ) {
            throw new Error("No existe una categoría con ese id")
        }
        if (!palabraExistente ) {
            throw new Error("No existe una palabra con ese id")
        }
        return true;
    }

    async eliminarPalabraPorCategoria(idCategoria: Categoria, idPalabra: Palabra) {
        const palabraAndCategoriaExistente = await this.palabraPorCategoriaRepository.findByIdCategoriaAndIdPalabra(idCategoria, idPalabra)
        
        if (!palabraAndCategoriaExistente) {
            throw new Error("Ninguna palabraPorCategoria corresponde a ese ID")
        }
        return this.palabraPorCategoriaRepository.delete(idPalabra, idCategoria)
    }
}