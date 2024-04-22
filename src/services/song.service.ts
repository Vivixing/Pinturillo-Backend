import { Palabra } from "../entities/Palabra.entity";
import { PalabraRepository } from "../repositories/palabra.repository";

export class PalabraService {
    private repository = new PalabraRepository();

    async findByPalabra(texto: string) {
        return this.repository.findByPalabra(texto);
    }

    async findByIdPalabra(idPalabra: string) {
        return this.repository.findByIdPalabra(idPalabra);
    }

    async getAll() {
        return this.repository.getAll();
    }

    async save(palabra: Palabra) {
        const palabraExistente = await this.repository.findByPalabra(palabra.texto);
        if (palabraExistente) {
            throw new Error('La palabra ya existe');
        }
        return this.repository.save(palabra);
    }

    async delete(id: string) {
        const palabraExistente = await this.repository.findByIdPalabra(id);
        if (!palabraExistente) {
            throw new Error('No se puede encontrar la palabra a eliminar');
        }
        return this.repository.delete(id);
    }
}