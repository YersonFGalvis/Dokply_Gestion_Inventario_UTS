import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';

@Entity()
export class Hardware {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column({ length: 50 })
  estado: string;

  @ManyToOne(() => Equipo, (equipo) => equipo.id)
  @JoinColumn({ name: 'equipo_id' })
  equipo_id: Equipo
}
