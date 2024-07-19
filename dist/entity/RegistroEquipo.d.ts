import { Equipo } from './Equipo';
import { Responsable } from './Responsable';
export declare class RegistroEquipo {
    id: number;
    equipo_id: Equipo;
    responsable_id: Responsable;
    fecha_asignacion: Date;
    fecha_devolucion: Date | null;
}
