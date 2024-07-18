import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Equipo, RegistroMantenimiento, Usuario } from "../entity";
import { RegistroMantenimientoDTO } from "../dto/registroMantenimiento.dto";
import { IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { EquipoService } from "./equipo.service";
import { TipoMantenimientoService } from "./tipoMantenimiento.service";
import { TipoMantenimiento } from '../entity/TipoMantenimiento';
import { UsuarioService } from './usuario.service';

export class RegistroMantenimientoService extends BaseService<RegistroMantenimiento> {
    constructor(
        private readonly _equipoService: EquipoService = new EquipoService(),
        private readonly _tipoMantenimientoService: TipoMantenimientoService = new TipoMantenimientoService(),
        private readonly _usuarioService: UsuarioService = new UsuarioService()
    ) {
        super(RegistroMantenimiento);
    }

    async findAllRegistroMantenimiento(): Promise<RegistroMantenimiento[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async findRegistroMantenimientoById(id: number): Promise<RegistroMantenimiento | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createRegistroMantenimiento(registroMantenimientoDTO: RegistroMantenimientoDTO): Promise<RegistroMantenimiento> {
        const { equipo_id, tipo_mantenimiento_id, fecha, detalle, usuario_id } = registroMantenimientoDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);

        const tipoMantenimiento: TipoMantenimiento | null = await this._tipoMantenimientoService.findTipoMantenimientoById(tipo_mantenimiento_id)

        const usuario: Usuario | null = await this._usuarioService.findById(usuario_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }
        if (!tipoMantenimiento) {
            throw new Error(`Tipo de mantenimiento con id ${tipo_mantenimiento_id} no encontrado`);
        }
        if (!usuario) {
            throw new Error(`Usuario con id ${usuario_id} no encontrado`);
        }

        const newRegistroMantenimiento = new RegistroMantenimiento();
        newRegistroMantenimiento.equipo_id = equipo;
        newRegistroMantenimiento.tipo_mantenimiento_id = tipoMantenimiento;
        newRegistroMantenimiento.fecha = fecha;
        newRegistroMantenimiento.detalle = detalle;
        newRegistroMantenimiento.usuario_id = usuario;

        const repository = await this.getRepository();

        try {
            return await repository.save(newRegistroMantenimiento);
        } catch (error) {
            console.error('Error al crear el registro de mantenimiento:', error);
            throw error;
        }
    }

    async updateRegistroMantenimiento(id: number, registroMantenimientoDTO: RegistroMantenimientoDTO): Promise<RegistroMantenimiento | null> {
        const repository = await this.getRepository();
        const registroMantenimientoToUpdate = await repository.findOneBy({ id });

        if (!registroMantenimientoToUpdate) {
            throw new Error(`Registro de Mantenimiento con id ${id} no encontrado`);
        }

        const equipo: Equipo | null = await this._equipoService.findEquipoById(registroMantenimientoDTO.equipo_id);

        const tipoMantenimiento: TipoMantenimiento | null = await this._tipoMantenimientoService.findTipoMantenimientoById(registroMantenimientoDTO.tipo_mantenimiento_id)

        const usuario: Usuario | null = await this._usuarioService.findById(registroMantenimientoDTO.usuario_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${registroMantenimientoDTO.equipo_id} no encontrado`);
        }
        if (!tipoMantenimiento) {
            throw new Error(`Tipo de mantenimiento con id ${registroMantenimientoDTO.tipo_mantenimiento_id} no encontrado`);
        }
        if (!usuario) {
            throw new Error(`Usuario con id ${registroMantenimientoDTO.usuario_id} no encontrado`);
        }

        repository.merge(registroMantenimientoToUpdate, {
            equipo_id: equipo,
            tipo_mantenimiento_id: tipoMantenimiento,
            usuario_id:usuario,
            fecha: new Date(registroMantenimientoDTO.fecha),
            detalle: registroMantenimientoDTO.detalle
        });

        try {
            return await repository.save(registroMantenimientoToUpdate);
        } catch (error) {
            console.error('Error al actualizar el registro de mantenimiento:', error);
            throw error;
        }
    }

    async deleteRegistroMantenimiento(id: number): Promise<void> {
        const repository = await this.getRepository();
        const registroMantenimientoToDelete = await repository.findOneBy({ id });

        if (!registroMantenimientoToDelete) {
            throw new Error(`RegistroMantenimiento con id ${id} no encontrado`);
        }

        try {
            await repository.remove(registroMantenimientoToDelete);
        } catch (error) {
            console.error('Error al eliminar el registro de mantenimiento:', error);
            throw error;
        }
    }
}
