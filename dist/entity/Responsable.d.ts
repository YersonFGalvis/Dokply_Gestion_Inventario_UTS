import { Cargo } from './Cargo';
import { RegistroEquipo } from './RegistroEquipo';
export declare class Responsable {
    id: number;
    cargo_id: Cargo;
    nombre: string;
    responsableEquipos: RegistroEquipo[];
}
