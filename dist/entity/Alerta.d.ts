import { Equipo } from './Equipo';
export declare class Alertas {
    id: number;
    tipo_alerta: string;
    fecha_hora_generacion: Date;
    estado: string;
    equipo_id: Equipo;
}
