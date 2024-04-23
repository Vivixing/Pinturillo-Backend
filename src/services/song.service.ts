import { Palabra } from "../entities/Palabra.entity";
import { PalabraRepository } from "../repositories/palabra.repository";

export class PalabraService {
    private repository = new PalabraRepository();

    async findByPalabra(texto: string) {
        const palabra = await this.repository.findByPalabra(texto);
        if(!palabra){
            throw new Error('No existe ninguna palabra que coincida con el parámetro proporcionado.');
        }
        return this.repository.findByPalabra(texto);
    }

    async findByIdPalabra(idPalabra: string) {
        return this.repository.findByIdPalabra(idPalabra);
    }

    async getAll(texto?:string) {
        return this.repository.getAll(texto);
    }

    async save(palabra: Palabra) {
        const palabraExistente = await this.repository.findByPalabra(palabra.texto);
        if (palabraExistente) {
            throw new Error('La palabra ya existe');
        }
        return this.repository.save(palabra);
    }

    async update(palabra: Palabra) {
        const palabraExistente = await this.repository.findByIdPalabra(palabra.idPalabra);
        if (!palabraExistente) {
            throw new Error('La palabra no existe, no se puede actualizar');
        }
        return this.repository.save(palabra);
    }

    async delete(idPalabra: string) {
        const palabraExistente = await this.repository.findByIdPalabra(idPalabra);
        if (!palabraExistente) {
            throw new Error('La palabra no existe, no se puede eliminar');
        }
        return this.repository.delete(idPalabra);
    }
}