import { BaseService } from "../config/serviceConfiguration";
import { Alertas } from "../entity";
import { AlertaDTO } from "../dto/alerta.dto";
import { EquipoService } from "./equipo.service";
export declare class AlertaService extends BaseService<Alertas> {
    private readonly _equipoService;
    constructor(_equipoService?: EquipoService);
    findAlertaById(id: number): Promise<Alertas | null>;
    createAlerta(alertaDTO: AlertaDTO): Promise<Alertas>;
    findAllAlertas(): Promise<Alertas[]>;
    updateAlerta(id: number, alertaDTO: AlertaDTO): Promise<Alertas | null>;
    deleteAlerta(id: number): Promise<void>;
}
