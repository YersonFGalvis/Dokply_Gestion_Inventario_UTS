import { Aula } from './Aula';
import { RegistroMantenimiento } from './RegistroMantenimiento';
import { Software } from './Software';
import { Hardware } from './Hardware';
import { RegistroEquipo } from './RegistroEquipo';
import { Alertas } from './Alerta';
export declare class Equipo {
    id: number;
    aula_id: Aula;
    codigo_qr: string;
    estado: string;
    marca: string;
    registroMantenimientos: RegistroMantenimiento[];
    responsableEquipos: RegistroEquipo[];
    software: Software[];
    hardwares: Hardware[];
    alertas: Alertas[];
}
