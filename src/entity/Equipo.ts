import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Aula } from './Aula';
import { RegistroMantenimiento } from './RegistroMantenimiento';
import { RegistroEquipo } from './RegistroEquipo';
import { EquipoSoftware } from './EquipoSoftware';
import { EquipoHardware } from './EquipoHardware';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aula, (aula) => aula.id)
  @JoinColumn({ name: 'aula_id' })
  aula_id: Aula
  
  @Column({ length: 50 })
  estado: string;

  @Column({ length: 50 })
  marca: string;

  @OneToMany(() => RegistroMantenimiento, (registroMantenimiento) => registroMantenimiento.equipo_id)  
  registroMantenimientos: RegistroMantenimiento[]

  @OneToMany(() => RegistroEquipo, (responsableEquipo) => responsableEquipo.equipo_id)  
  responsableEquipos: RegistroEquipo[]

  @OneToMany(() => EquipoSoftware, (equipoSoftware) => equipoSoftware.equipo_id)
  equipoSoftware: EquipoSoftware[];

  @OneToMany(() => EquipoHardware, (equipoHardware) => equipoHardware.equipo_id)
  equipoHardware: EquipoHardware[];


}

