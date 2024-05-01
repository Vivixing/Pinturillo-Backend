import { AppDataSource } from "../data-source";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";


export class PalabraPorCategoriaRepository {
    private repository = AppDataSource.getRepository(PalabraPorCategoria);

    async findByIdPalabraPorCategoria(idPalabraPorCategoria: number) {
        return this.repository.findOneBy({idPalabraPorCategoria});
    }

    async findByIdCategoria(idCategoria: String) {
        return this.repository.findOneBy({ idCategoria });
    }

    async findByIdPalabra(idPalabra: String) {
        return this.repository.findOneBy({idPalabra});
    }

    async getAll() {
        return this.repository.find();
    }

    async save(palabraPorCategoria: PalabraPorCategoria) {
        return this.repository.save(palabraPorCategoria);
    }

    async delete(idPalabraPorCategoria: number) {
        return this.repository.delete(idPalabraPorCategoria);
    }
}