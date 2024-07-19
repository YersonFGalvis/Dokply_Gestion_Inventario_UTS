import { Edificio } from './Edificio';
import { Equipo } from './Equipo';
export declare class Aula {
    id: number;
    nombre: string;
    edificio_id: Edificio;
    equipos: Equipo[];
}
