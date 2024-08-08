import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';
import { Software } from './Software';

@Entity('equiposoftware')
export class EquipoSoftware {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo, (equipo) => equipo.id)
  @JoinColumn({ name: 'equipo_id' })
  equipo_id: Equipo;

  @ManyToOne(() => Software, (software) => software.id)
  @JoinColumn({ name: 'software_id' })
  software_id: Software;
}
