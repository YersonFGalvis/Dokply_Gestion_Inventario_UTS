import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cargo } from './Cargo';


@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @OneToMany(() => Cargo, (cargo) => cargo.area_id)
    cargos: Cargo[]
}