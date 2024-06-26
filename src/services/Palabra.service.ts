import { Palabra } from "../entities/Palabra.entity";
import { PalabraRepository } from "../repositories/palabra.repository";


export class PalabraService {

    private palabraRepository: PalabraRepository = new PalabraRepository();

    getAll() {
        return this.palabraRepository.getAll()
    }

    findByPalabra(texto: string) {
        return this.palabraRepository.findByPalabra(texto)
    }

    findByIdPalabra(idPalabra: string) {
        return this.palabraRepository.findByIdPalabra(idPalabra)
    }

    async save(palabra:Palabra) {
        try {
            palabra.texto = palabra.texto.replace(/\s+/g, ' ')
            await this.validaciones(palabra);
            return this.palabraRepository.save(palabra);
        } catch (error) {
            throw error;
        }
    }

    async validaciones(palabra:Palabra) {
        const palabraExistente = await this.palabraRepository.findByPalabra(palabra.texto)
        if (palabraExistente) {
            throw new Error("Ya existe esa palabra")
        }
        const regex = /^[a-zA-Z\sÁÉÍÓÚáéíóú]+$/
        if (!regex.test(palabra.texto)) {
            throw new Error("La palabra no puede contener números ni carácteres especiales")
        }
        return true;
    }

    async update(palabra:Palabra) {
        try {
            const palabraExistente = await this.palabraRepository.findByIdPalabra(palabra.idPalabra)
            if (!palabraExistente) {
                throw new Error("Ninguna palabra corresponde a ese Id");
            }
            palabra.texto = palabra.texto.replace(/\s+/g, ' ')
            await this.validaciones(palabra);
            return this.palabraRepository.save(palabra);
        } catch (error) {
            throw error;
        }
    }
    async delete(idPalabra: string) {
        const palabraExistente = await this.palabraRepository.findByIdPalabra(idPalabra)
        if (!palabraExistente) {
            throw new Error("Ninguna palabra corresponde a ese Id")
        }
        return this.palabraRepository.delete(idPalabra)
    }
}