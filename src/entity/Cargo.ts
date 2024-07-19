import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Area } from './Area';
import { Responsable } from './Responsable';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, (area) => area.id)
  @JoinColumn({ name: 'area_id' })
  area_id: Area;

  @Column()
  nombre: string;

  @OneToMany(() => Responsable, (responsable) => responsable.cargo_id)
    responsable: Responsable[]

}