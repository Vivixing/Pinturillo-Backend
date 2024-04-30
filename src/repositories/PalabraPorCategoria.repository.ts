import { AppDataSource } from "../data-source";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";
import { Categoria } from "../entities/Categoria.entity";
import { Palabra } from "../entities/Palabra.entity";

export class PalabraPorCategoriaRepository {
    private repository = AppDataSource.getRepository(PalabraPorCategoria);

    async findByIdCategoria(idCategoria: Categoria) {
        return this.repository.findOneBy({ idCategoria });
    }

    async findByIdCategoriaAndIdPalabra(idCategoria: Categoria, idPalabra: Palabra) {
        return this.repository.findOneBy({ idCategoria, idPalabra });
    }

    async findByIdPalabra(idPalabra: Palabra) {
        return this.repository.findOneBy({ idPalabra });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(palabraPorCategoria: PalabraPorCategoria) {
        return this.repository.save(palabraPorCategoria);
    }

    async delete(idPalabra: Palabra, idCategoria: Categoria ) {
        return this.repository.delete({idPalabra, idCategoria});
    }
}