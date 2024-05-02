import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Categoria } from "./Categoria.entity";
import { Palabra } from "./Palabra.entity";

@Entity({ name: "PalabraPorCategoria" })
export class PalabraPorCategoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPalabraPorCategoria: number;

  @Column({name: 'idPalabra', nullable: false})
  idPalabra: String;

  @Column({name: 'idCategoria', nullable: false})
  idCategoria: String;
  

  @ManyToOne(() => Palabra, {nullable: false})
  @JoinColumn({ name: "idPalabra", referencedColumnName: 'idPalabra'})
  palabras?: Palabra[];
  

  @ManyToOne(() => Categoria, (categoria) => categoria)
  @JoinColumn({ name: "idCategoria", referencedColumnName: 'idCategoria' })
  categorias?: Categoria[];
} 