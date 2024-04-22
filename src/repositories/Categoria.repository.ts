import { Categoria } from "../entities/Categoria.entity";
import { AppDataSource } from "../data-source";

export class CategoriaRepository {
    private repository = AppDataSource.getRepository(Categoria);

    async findByNombre(nombre: string) {
        return this.repository.findOneBy({ nombre });
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

    async delete(idCategoria) {
        return this.repository.delete(idCategoria);
    }
}