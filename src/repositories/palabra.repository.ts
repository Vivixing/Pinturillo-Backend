import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { Palabra } from "../entities/Palabra.entity";

export class PalabraRepository{
    private repository = AppDataSource.getRepository(Palabra);

   
    async findByPalabra(texto: string) {
        return this.repository.findOneBy({ texto: ILike(`%${texto}%`)});
    }

    async findByIdPalabra(idPalabra: string) {
        return this.repository.findOneBy({ idPalabra });
    }
    
    async getAll(texto?: string) {
        return this.repository.find({where : texto ? {texto} : {}});
    }

    async save(palabra: Palabra){
        return this.repository.save(palabra);
    }
   
    async delete (idPalabra: string){
        return this.repository.delete(idPalabra);
    }
}