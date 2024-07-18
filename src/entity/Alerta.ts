import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';

@Entity('alertas')
export class Alertas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  tipo_alerta: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_hora_generacion: Date;

  @Column({ length: 50 })
  estado: string;

  @ManyToOne(() => Equipo, (equipo) => equipo.id)
  @JoinColumn({ name: 'equipo_id' })
  equipo_id: Equipo


}
