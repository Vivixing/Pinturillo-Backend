import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";
  
  @Entity({ name: "Categoria" })
  export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    idCategoria: string;
  
    @Column({ nullable: false })
    nombre: string;
  }