import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from './Equipo';
import { Usuario } from './Usuario';
import { TipoMantenimiento } from './TipoMantenimiento';

@Entity('registromantenimiento')
export class RegistroMantenimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo, (equipo) => equipo.id)
  @JoinColumn({ name: 'equipo_id' })
  equipo_id: Equipo

  @ManyToOne(() => TipoMantenimiento, (tipoMantenimiento) => tipoMantenimiento.id)
  @JoinColumn({ name: 'tipo_mantenimiento_id' })
  tipo_mantenimiento_id: TipoMantenimiento

  @Column()
  fecha: Date;

  @Column('text', { nullable: true })
  detalle: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'usuario_id' })
  usuario_id: Usuario

  


}