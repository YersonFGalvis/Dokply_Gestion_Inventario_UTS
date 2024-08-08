import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Equipo } from './Equipo';
import { EquipoHardware } from './EquipoHardware';

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

  @OneToMany(() => EquipoHardware, (equipoHardware) => equipoHardware.hardware_id)
  equipoHardware: EquipoHardware[];
}
