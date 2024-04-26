import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { SalaDeJuego } from "./SalaDeJuego.entity";

@Entity({ name: "Categoria" })
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  idCategoria: string;

  @Column({ nullable: false })
  nombre: string;

  @OneToMany(() => SalaDeJuego, (salaDeJuego) => salaDeJuego.idCategoria) // note: we will create author property in the Photo class below
  salasDeJuego: []
}