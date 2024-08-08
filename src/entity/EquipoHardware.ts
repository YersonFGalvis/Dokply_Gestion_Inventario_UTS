import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';
import { Hardware } from './Hardware';

@Entity('equipohardware')
export class EquipoHardware {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo, (equipo) => equipo.id)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @ManyToOne(() => Hardware, (hardware) => hardware.id)
  @JoinColumn({ name: 'hardware_id' })
  hardware: Hardware;
}
