import { SalaDeJuego } from "../entities/SalaDeJuego.entity";
import { PalabraPorCategoriaRepository } from "./PalabraPorCategoria.repository";
import { SalaDeJuegoRepository } from "./SalaDeJuego.repository";
import { PalabraRepository } from "./palabra.repository";


export class SocketRepository{
    public salaDeJuegoRepository = new SalaDeJuegoRepository();
    public palabraPorCategoriaRepository = new PalabraPorCategoriaRepository();
    public palabraRepository = new PalabraRepository();

    async getRoom(idSalaDeJuego){
        return this.salaDeJuegoRepository.findByIdSalaDeJuego(idSalaDeJuego)
    }

    async updateRoom(sala: SalaDeJuego){
        return this.salaDeJuegoRepository.save(sala)
    }

    async wordsCategory(idCategoria){
        return this.palabraPorCategoriaRepository.findByIdCategoria(idCategoria)
    }

    async word(idPalabra){
        return this.palabraRepository.findByIdPalabra(idPalabra)
    }
} 