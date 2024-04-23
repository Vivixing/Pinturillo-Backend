import { Categoria } from "../entities/Categoria.entity";
import { AppDataSource } from "../data-source";
import { ILike } from "typeorm";

export class CategoriaRepository {
    private repository = AppDataSource.getRepository(Categoria);

    async findByNombre(nombre: string) {
        return this.repository.findOneBy({ nombre: ILike(`%${nombre}%`) });
    }

    async findByIdCategoria(idCategoria: string) {
        return this.repository.findOneBy({ idCategoria });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(categoria: Categoria) {
        return this.repository.save(categoria);
    }

    async delete(idCategoria: string) {
        return this.repository.delete(idCategoria);
    }
}