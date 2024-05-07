import { AppDataSource } from "../data-source";
import { PalabraPorCategoria } from "../entities/PalabraPorCategoria.entity";


export class PalabraPorCategoriaRepository {
    private repository = AppDataSource.getRepository(PalabraPorCategoria);

    async findByIdCategoria(idCategoria: string) {
        return this.repository.findBy({ idCategoria });
    }

    async findByIdPalabra(idPalabra: string) {
        return this.repository.findBy({idPalabra});
    }
    async findByIdPalabraAndIdCategoria(idPalabra: string, idCategoria: string) {
        return this.repository.findBy({idPalabra, idCategoria});
    }
    
    async getAll() {
        return this.repository.find();
    }

    async save(palabraPorCategoria: PalabraPorCategoria) {
        return this.repository.save(palabraPorCategoria);
    }

    async delete(idPalabra: string, idCategoria: string) {
        return this.repository.delete({ idPalabra, idCategoria });
    }
}