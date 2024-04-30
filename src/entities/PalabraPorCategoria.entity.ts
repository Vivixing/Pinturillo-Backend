import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Categoria } from "./Categoria.entity";
import { Palabra } from "./Palabra.entity";

@Entity({ name: "PalabraPorCategoria" })
export class PalabraPorCategoria extends BaseEntity {
  
  @PrimaryColumn({ type: 'uuid' })
  @ManyToOne(() => Palabra, (palabra) => palabra)
  @JoinColumn({ name: "idPalabra" })
  idPalabra: Palabra;
  
  @PrimaryColumn({ type: 'uuid' })
  @ManyToOne(() => Categoria, (categoria) => categoria)
  @JoinColumn({ name: "idCategoria" })
  idCategoria: Categoria;
} 