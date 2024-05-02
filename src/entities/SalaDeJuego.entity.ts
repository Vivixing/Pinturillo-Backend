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
  
  @Column({name: 'idCategoria', nullable: false})
  idCategoria: string;

  @ManyToOne(() => Categoria, (categoria) => categoria)
  @JoinColumn({ name: "idCategoria", referencedColumnName: 'idCategoria' })
  categorias?: Categoria[];

  @Column({ nullable: false })
  estado: string;
}