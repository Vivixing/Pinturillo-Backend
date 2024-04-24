import { SalaDeJuego } from "../entities/SalaDeJuego.entity";
import { CategoriaRepository } from "../repositories/Categoria.repository";
import { SalaDeJuegoRepository } from "../repositories/SalaDeJuego.repository";

export class SalaDeJuegoService {

    private salaDeJuegoRepository: SalaDeJuegoRepository = new SalaDeJuegoRepository();
    private categoriaRepository: CategoriaRepository = new CategoriaRepository();

    encontrarTodos() {
        return this.salaDeJuegoRepository.getAll()
    }

    encontrarPorNombre(nombre: string) {
        return this.salaDeJuegoRepository.findByNombre(nombre)
    }

    encontrarIdCategoria(idCategoria: string) {
        return this.salaDeJuegoRepository.findByIdCategoria(idCategoria)
    }

    encontrarIdSalaDeJuego(idSalaDeJuego: number) {
        return this.salaDeJuegoRepository.findByIdSalaDeJuego(idSalaDeJuego)
    }

    async guardarSalaDeJuego(salaDeJuego: SalaDeJuego) {
        try {
            salaDeJuego.nombre = salaDeJuego.nombre.replace(/\s+/g, ' ')
            salaDeJuego.estado = "Sin iniciar"
            await this.validaciones(salaDeJuego);
            return this.salaDeJuegoRepository.save(salaDeJuego);
        } catch (error) { 
            throw error;
        }
    }

    async validaciones(salaDeJuego: SalaDeJuego) {
        const categoriaExistente = await this.categoriaRepository.findByIdCategoria(salaDeJuego.idCategoria)
        if (!categoriaExistente) {
            throw new Error("No existe una categoría con ese id")
        }
        return true;
    }

    async actualizarSalaDeJuego(salaDeJuego: SalaDeJuego) {
        try {
            salaDeJuego.nombre = salaDeJuego.nombre.replace(/\s+/g, ' ')
            const salaDeJuegoExistente = await this.salaDeJuegoRepository.findByIdSalaDeJuego(salaDeJuego.idSalaDeJuego);
            if (!salaDeJuegoExistente) {
                throw new Error("Ninguna salaDeJuego corresponde a ese ID");
            }

            await this.validaciones(salaDeJuego);
            return this.salaDeJuegoRepository.save(salaDeJuego);
        } catch (error) {
            throw error;
        }
    }
    async eliminarSalaDeJuego(idSalaDeJuego: number) {
        const salaDeJuegoExistente = await this.salaDeJuegoRepository.findByIdSalaDeJuego(idSalaDeJuego)
        if (!salaDeJuegoExistente) {
            throw new Error("Ninguna salaDeJuego corresponde a ese ID")
        }
        return this.salaDeJuegoRepository.delete(idSalaDeJuego)
    }
}