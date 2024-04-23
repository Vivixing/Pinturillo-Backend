import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity({ name: "SalaDeJuego" })
export class SalaDeJuego extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSalaDeJuego: number;

  @Column({ nullable: false })
  nombre: string;
}