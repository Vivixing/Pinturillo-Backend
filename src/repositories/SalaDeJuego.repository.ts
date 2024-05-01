import { AppDataSource } from "../data-source";
import { ILike } from "typeorm";
import { SalaDeJuego } from "../entities/SalaDeJuego.entity";

export class SalaDeJuegoRepository {
    private repository = AppDataSource.getRepository(SalaDeJuego);

    async findByNombre(nombre: String) {
        return this.repository.findOneBy({ nombre: ILike(`%${nombre}%`) });
    }

    async findByEstado(estado: String) {
        return this.repository.findOneBy({ estado: ILike(`%${estado}%`) });
    }

    async findByIdCategoria(idCategoria: String) {
        return this.repository.findOneBy({ idCategoria: ILike(`%${idCategoria}%`) });
    }

    async findByIdSalaDeJuego(idSalaDeJuego: number) {
        return this.repository.findOneBy({ idSalaDeJuego });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(salaDeJuego: SalaDeJuego) {
        return this.repository.save(salaDeJuego);
    }

    async delete(idSalaDeJuego: number) {
        return this.repository.delete(idSalaDeJuego);
    }
}