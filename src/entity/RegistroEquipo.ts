import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';
import { Responsable } from './Responsable';

@Entity('registroequipo')
export class RegistroEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo, (equipo) => equipo.id)
  @JoinColumn({ name: 'equipo_id' })
  equipo_id: Equipo

  @ManyToOne(() => Responsable, (responsable) => responsable.id)
  @JoinColumn({ name: 'responsable_id' })
  responsable_id: Responsable

  @Column({ type: 'timestamp' })
  fecha_asignacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_devolucion: Date | null;
}
