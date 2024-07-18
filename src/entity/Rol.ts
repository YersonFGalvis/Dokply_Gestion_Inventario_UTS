import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    nombre: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol_id)
    usuarios: Usuario[]
}