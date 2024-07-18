import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';

@Entity('softwareinstalado')
export class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  version: string;

  @ManyToOne(() => Equipo, (equipo) => equipo.software)
  @JoinColumn({ name: 'equipo_id' })
  equipo_id: Equipo
  
  @Column({ length: 50 })
  licencia: string;

}
