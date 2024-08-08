import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Equipo } from './Equipo';
import { EquipoSoftware } from './EquipoSoftware';

@Entity()
export class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  version: string;
  
  @Column({ length: 50 })
  licencia: string;

  @OneToMany(() => EquipoSoftware, (equipoSoftware) => equipoSoftware.software_id)
  equipoSoftware: EquipoSoftware[];
}
