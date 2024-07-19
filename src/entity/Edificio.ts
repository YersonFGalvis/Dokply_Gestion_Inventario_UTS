import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Aula } from './Aula';

@Entity()
export class Edificio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  letra: string;

  @OneToMany(() => Aula, (aula) => aula.edificio_id)  
  aulas: Aula[]
}