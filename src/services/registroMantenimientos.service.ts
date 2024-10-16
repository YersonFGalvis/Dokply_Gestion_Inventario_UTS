import { Between, Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Equipo, RegistroMantenimiento, Usuario } from "../entity";
import { RegistroMantenimientoDTO } from "../dto/registroMantenimiento.dto";
import { EquipoService } from "./equipo.service";
import { TipoMantenimientoService } from "./tipoMantenimiento.service";
import { TipoMantenimiento } from '../entity/TipoMantenimiento';
import { UsuarioService } from './usuario.service';
import { IDashboardMantenimiento } from "src/interfaces/dashboard.interface";
import { startOfMonth, endOfMonth, subMonths, startOfDay, endOfDay } from 'date-fns';


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
        return repository
            .createQueryBuilder('registromantenimiento')
            .leftJoinAndSelect('registromantenimiento.usuario_id', 'usuario')
            .leftJoinAndSelect('registromantenimiento.tipo_mantenimiento_id', 'tipo_mantenimiento')
            .leftJoinAndSelect('registromantenimiento.equipo_id', 'equipo')
            .leftJoinAndSelect('equipo.aula_id', 'aula')
            .leftJoinAndSelect('aula.edificio_id', 'edificio')
            .getMany();
    }

    async findRegistroMantenimientoById(id: number): Promise<RegistroMantenimiento | null> {
        const repository = await this.getRepository();
        return repository
            .createQueryBuilder('registromantenimiento')
            .leftJoinAndSelect('registromantenimiento.usuario_id', 'usuario')
            .leftJoinAndSelect('registromantenimiento.tipo_mantenimiento_id', 'tipo_mantenimiento')
            .leftJoinAndSelect('registromantenimiento.equipo_id', 'equipo')
            .leftJoinAndSelect('equipo.aula_id', 'aula')
            .leftJoinAndSelect('aula.edificio_id', 'edificio')
            .where('registromantenimiento.id = :id', { id })
            .getOne();
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
            tipo_mantenimiento_id: tipoMantenimiento,
            detalle: registroMantenimientoDTO.detalle
        });

        try {
            return await repository.save(registroMantenimientoToUpdate);
        } catch (error) {
            console.error('Error al actualizar el registro de mantenimiento:', error);
            throw error;
        }
    }

    async deleteRegistroMantenimiento(id: number): Promise<RegistroMantenimiento[]> {
        const repository = await this.getRepository();
        const registroMantenimientoToDelete = await repository.createQueryBuilder('rm')
            .where('rm.equipo_id = :id', { id })
            .getMany();

        if (registroMantenimientoToDelete.length === 0) {
            throw new Error(`registroMantenimiento con id ${id} no encontrado`);
        }

        try {
            await repository.createQueryBuilder()
                .delete()
                .from(RegistroMantenimiento)
                .where('equipo_id = :id', { id })
                .execute();

            return registroMantenimientoToDelete;
        } catch (error) {
            console.error('Error al eliminar el registroMantenimiento:', error);
            throw error;
        }
    }

    async getRegistroMantenimientosInicio(): Promise<IDashboardMantenimiento> {
        try {

            const repository = await this.getRepository();
            const currentDate = new Date();
            const startOfCurrentMonth = startOfMonth(currentDate);
            const endOfCurrentMonth = endOfMonth(currentDate);


            const startOfLastMonth = startOfMonth(subMonths(currentDate, 1));
            const endOfLastMonth = endOfMonth(subMonths(currentDate, 1));

            // Total de equipos a los que se les ha hecho mantenimiento
            const totalEquiposMantenidos = await repository
                .createQueryBuilder('mantenimiento')
                .select('COUNT(mantenimiento.equipo_id)', 'total')
                .getRawOne();

            // Mantenimientos en el mes actual
            const mantenimientosMesActual = await repository
                .createQueryBuilder('mantenimiento')
                .where('mantenimiento.fecha BETWEEN :startOfCurrentMonth AND :endOfCurrentMonth', {
                    startOfCurrentMonth: startOfCurrentMonth.toISOString(),
                    endOfCurrentMonth: endOfCurrentMonth.toISOString(),
                })
                .getCount();

            // Mantenimientos en el mes pasado
            const mantenimientosMesPasado = await repository
                .createQueryBuilder('mantenimiento')
                .where('mantenimiento.fecha BETWEEN :startOfLastMonth AND :endOfLastMonth', {
                    startOfLastMonth: startOfLastMonth.toISOString(),
                    endOfLastMonth: endOfLastMonth.toISOString(),
                })
                .getCount();

            return {
                totalEquiposMantenidos,
                mantenimientosMesActual,
                mantenimientosMesPasado
            };
        } catch (error) {
            console.error('Error al traer los datos del dashboard:', error);
            throw error;
        }
    }
}
