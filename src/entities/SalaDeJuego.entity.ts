import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Categoria } from "./Categoria.entity";

@Entity({ name: "SalaDeJuego" })
export class SalaDeJuego extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSalaDeJuego: number;

  @Column({ nullable: false })
  nombre: string;
  

  @ManyToOne(() => Categoria, (categoria) => categoria.salasDeJuego)
  @JoinColumn({ name: "idCategoria" })
  idCategoria: string;

  @Column({ nullable: false })
  estado: string;
}