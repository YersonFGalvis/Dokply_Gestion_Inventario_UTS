import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Edificio } from './Edificio';
import { Equipo } from './Equipo';

@Entity()
export class Aula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Edificio, (edificio) => edificio.id)
  @JoinColumn({ name: 'edificio_id' })
  edificio_id: Edificio

  @OneToMany(() => Equipo, (equipo) => equipo.aula_id)  
  equipos: Equipo[]
}
