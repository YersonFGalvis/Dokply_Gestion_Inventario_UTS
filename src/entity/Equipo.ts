import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Aula } from './Aula';
import { RegistroMantenimiento } from './RegistroMantenimiento';
import { Software } from './Software';
import { Hardware } from './Hardware';
import { RegistroEquipo } from './RegistroEquipo';
import { Alertas } from './Alerta';

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

  @OneToMany(() => Software, (software) => software.equipo_id)  
  software: Software[]

  @OneToMany(() => Hardware, (hardware) => hardware.equipo_id)  
  hardwares: Hardware[]

  @OneToMany(() => Alertas, (alertas) => alertas.equipo_id)  
  alertas: Alertas[]

}

