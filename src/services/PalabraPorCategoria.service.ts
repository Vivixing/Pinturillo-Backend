import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";
import { PalabraPorCategoriaRepository } from "../repositories/PalabraPorCategoria.repository";

export class PalabraPorCategoriaService {

    private palabraPorCategoriaRepository: PalabraPorCategoriaRepository = new PalabraPorCategoriaRepository();

    encontrarTodos() {
        return this.palabraPorCategoriaRepository.getAll()
    }

    encontrarIdPalabraPorCategoria(idPalabraPorCategoria: number) {
        return this.palabraPorCategoriaRepository.findByIdPalabraPorCategoria(idPalabraPorCategoria)
    }

    encontrarIdCategoria(idCategoria: String) {
        return this.palabraPorCategoriaRepository.findByIdCategoria(idCategoria)
    }
    
    encontrarIdPalabra(idPalabra: String) {
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
        const categoriaExistente = await this.palabraPorCategoriaRepository.findByIdCategoria(palabraPorCategoria.idCategoria)
        const palabraExistente = await this.palabraPorCategoriaRepository.findByIdPalabra(palabraPorCategoria.idPalabra)

        if (!categoriaExistente) {
            throw new Error("No existe una categoría con ese id")
        }
        if (!palabraExistente){
            throw new Error("No existe una palabra con ese id")
        }
        return true;
    }

    async eliminarPalabraPorCategoria(idPalabraPorCategoria: number) {
        const palabraCategoriaExistente = await this.palabraPorCategoriaRepository.findByIdPalabraPorCategoria(idPalabraPorCategoria)
        
        if (!palabraCategoriaExistente) {
            throw new Error("Ninguna palabraPorCategoria corresponde a ese ID")
        }
        return this.palabraPorCategoriaRepository.delete(idPalabraPorCategoria)
    }
}