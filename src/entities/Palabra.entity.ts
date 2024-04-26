import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";
  
  @Entity({ name: "palabra" })
  export class Palabra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    idPalabra: string;
  
    @Column({ nullable: false })
    texto: string;
    
  }