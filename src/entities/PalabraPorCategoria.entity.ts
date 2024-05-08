import {
  Entity,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Categoria } from "./Categoria.entity";
import { Palabra } from "./Palabra.entity";

@Entity({ name: "PalabraPorCategoria" })
export class PalabraPorCategoria extends BaseEntity {

  @PrimaryColumn({name: 'idPalabra', nullable: false})
  idPalabra: string;

  @PrimaryColumn({name: 'idCategoria', nullable: false})
  idCategoria: string;
  

  @ManyToOne(() => Palabra, {nullable: false})
  @JoinColumn({ name: "idPalabra", referencedColumnName: 'idPalabra'})
  palabras?: Palabra[];
  

  @ManyToOne(() => Categoria, (categoria) => categoria)
  @JoinColumn({ name: "idCategoria", referencedColumnName: 'idCategoria' })
  categorias?: Categoria[];
  length: number;

  palabra: string;
  categoria: string;
} 