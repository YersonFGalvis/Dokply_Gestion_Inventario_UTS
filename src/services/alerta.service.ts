import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Alertas, Equipo } from "../entity";
import { AlertaDTO } from "../dto/alerta.dto";
import { EquipoService } from "./equipo.service";

export class AlertaService extends BaseService<Alertas> {
    constructor(private readonly _equipoService: EquipoService = new EquipoService()) {
        super(Alertas);
    }

    async findAlertaById(id: number): Promise<Alertas | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createAlerta(alertaDTO: AlertaDTO): Promise<Alertas> {
        const { tipo_alerta, fecha_hora_generacion, estado, equipo_id } = alertaDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }

        const newAlerta = new Alertas();
        newAlerta.tipo_alerta = tipo_alerta;
        newAlerta.fecha_hora_generacion = fecha_hora_generacion;
        newAlerta.estado = estado;
        newAlerta.equipo_id = equipo;

        try {
            const repository = await this.getRepository();
            return await repository.save(newAlerta);
        } catch (error) {
            console.error('Error al crear la alerta:', error);
            throw error;
        }
    }

    async findAllAlertas(): Promise<Alertas[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateAlerta(id: number, alertaDTO: AlertaDTO): Promise<Alertas | null> {
        const repository = await this.getRepository();
        const alertaToUpdate = await repository.findOneBy({ id });

        if (!alertaToUpdate) {
            throw new Error(`Alerta con id ${id} no encontrada`);
        }

        const equipo: Equipo | null = await this._equipoService.findEquipoById(alertaDTO.equipo_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${alertaDTO.equipo_id} no encontrado`);
        }

        repository.merge(alertaToUpdate, {
            tipo_alerta: alertaDTO.tipo_alerta,
            fecha_hora_generacion: alertaDTO.fecha_hora_generacion,
            estado: alertaDTO.estado,
            equipo_id: equipo
        });

        try {
            return await repository.save(alertaToUpdate);
        } catch (error) {
            console.error('Error al actualizar la alerta:', error);
            throw error;
        }
    }

    async deleteAlerta(id: number): Promise<void> {
        const repository = await this.getRepository();
        const alertaToDelete = await repository.findOneBy({ id });

        if (!alertaToDelete) {
            throw new Error(`Alerta con id ${id} no encontrada`);
        }

        try {
            await repository.remove(alertaToDelete);
        } catch (error) {
            console.error('Error al eliminar la alerta:', error);
            throw error;
        }
    }

}
