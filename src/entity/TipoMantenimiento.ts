import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { RegistroMantenimiento } from './RegistroMantenimiento';

@Entity('tipomantenimiento')
export class TipoMantenimiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @OneToMany(() => RegistroMantenimiento, (registroMantenimiento) => registroMantenimiento.tipo_mantenimiento_id)
    registroMantenimientos: RegistroMantenimiento[]
}