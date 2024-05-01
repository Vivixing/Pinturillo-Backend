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
  nombre: String;
  
  @Column({name: 'idCategoria', nullable: false})
  idCategoria: String;

  @ManyToOne(() => Categoria, (categoria) => categoria)
  @JoinColumn({ name: "idCategoria", referencedColumnName: 'id' })
  categorias?: Categoria[];

  @Column({ nullable: false })
  estado: String;
}