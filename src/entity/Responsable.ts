import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cargo } from './Cargo';
import { RegistroEquipo } from './RegistroEquipo';
import { Equipo } from './Equipo';

@Entity()
export class Responsable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cargo, (cargo) => cargo.id)
  @JoinColumn({ name: 'cargo_id' })
  cargo_id: Cargo

  @Column()
  nombre: string;

  @OneToMany(() => RegistroEquipo, (responsableEquipo) => responsableEquipo.responsable_id)
  responsableEquipos: RegistroEquipo[]

}