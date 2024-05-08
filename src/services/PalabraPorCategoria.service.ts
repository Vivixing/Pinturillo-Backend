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


    encontrarIdCategoria(idCategoria: string) {
        return this.palabraPorCategoriaRepository.findByIdCategoria(idCategoria)
    }

    encontrarIdPalabra(idPalabra: string) {
        return this.palabraPorCategoriaRepository.findByIdPalabra(idPalabra)
    }

    async guardarPalabraPorCategoria(palabraPorCategoria: PalabraPorCategoria) {
        try {
            palabraPorCategoria = await this.validaciones(palabraPorCategoria);
            return this.palabraPorCategoriaRepository.save(palabraPorCategoria);
        } catch (error) {
            throw error;
        }
    }

    async validaciones(palabraPorCategoria: PalabraPorCategoria) {
        const categoriaExistente = await this.categoriaRepository.findByIdCategoria(palabraPorCategoria.idCategoria)
        const palabraExistente = await this.palabraRepository.findByIdPalabra(palabraPorCategoria.idPalabra)
        const palabraPorCategoriaExist = await this.palabraPorCategoriaRepository.findByIdPalabraAndIdCategoria(palabraPorCategoria.idPalabra, palabraPorCategoria.idCategoria)
        if (!categoriaExistente) {
            throw new Error("No existe una categoría con ese id")
        }
        if (!palabraExistente) {
            throw new Error("No existe una palabra con ese id")
        }
        if (palabraPorCategoriaExist.length > 0) {
            throw new Error("Ya existe esa palabra por categoría")
        }
        return palabraPorCategoria;
    }

    async eliminarPalabraPorCategoria(idPalabra: string, idCategoria: string) {
        const palabraPorCategoriaExist = await this.palabraPorCategoriaRepository.findByIdPalabraAndIdCategoria(idPalabra, idCategoria)
        if (palabraPorCategoriaExist.length === 0) {
            throw new Error("No existe esa asociación")
        }
        return this.palabraPorCategoriaRepository.delete(idPalabra, idCategoria)
    }

    async obtenerPalabrayCategoria(palabraPorCategoria) {
        const palabra = await this.palabraRepository.findByIdPalabra(palabraPorCategoria.idPalabra)
        const categoria = await this.categoriaRepository.findByIdCategoria(palabraPorCategoria.idCategoria)
        const palabraTexto = palabra.texto
        const categoriaTexto = categoria.nombre
        return { palabraTexto, categoriaTexto }
    }
    async asignarPalabrayCategoria(palabrasPorCategoria) {
        if (palabrasPorCategoria.length > 0) {
            for (const palabraPorCategoria of palabrasPorCategoria) {
                const palabra = await this.palabraRepository.findByIdPalabra(palabraPorCategoria.idPalabra)
                const categoria = await this.categoriaRepository.findByIdCategoria(palabraPorCategoria.idCategoria)
                palabraPorCategoria.palabra = palabra.texto
                palabraPorCategoria.categoria = categoria.nombre
            }
        }
        else {
            const palabra = await this.palabraRepository.findByIdPalabra(palabrasPorCategoria.idPalabra)
            const categoria = await this.categoriaRepository.findByIdCategoria(palabrasPorCategoria.idCategoria)
            palabrasPorCategoria.palabra = palabra.texto
            palabrasPorCategoria.categoria = categoria.nombre
        }
        return palabrasPorCategoria
    }
}