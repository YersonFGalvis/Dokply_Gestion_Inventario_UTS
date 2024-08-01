import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn, OneToMany } from 'typeorm';
import { Rol } from "./Rol";
import { Exclude } from 'class-transformer';
import { RoleType } from '../helpers/enums';
import { RegistroMantenimiento } from './RegistroMantenimiento';

@Entity()
export class Usuario extends BaseEntity{
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255, select: false})
  pass: string;
  
  @ManyToOne(() => Rol, (rol) => rol.id)
  @Column({ type:"enum", enum: RoleType, default: RoleType.USUARIO})
  @JoinColumn({ name: 'rol_id' })
  rol_id: RoleType

  @OneToMany(() => RegistroMantenimiento, (registroMantenimiento) => registroMantenimiento.usuario_id)
  registroMantenimientos: RegistroMantenimiento[]

}
