import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { EquipoHardwareService } from '../services/equipoHardware.service';

export class EquipoHardwareController {
    constructor(private readonly equipoHardwareService: EquipoHardwareService = new EquipoHardwareService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getEquiposHardware(req: Request, res: Response) {
        try {
            const data = await this.equipoHardwareService.findAllEquiposHardware();

            if (data.length === 0) {
                return this.httpResponse.NotFound("No hay registros de EquiposHardware creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getEquipoHardwareById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.equipoHardwareService.findEquipoHardwareById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound("No existe el registro de EquipoHardware");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError(e);
        }
    }

    async createEquipoHardware(req: Request, res: Response) {
        try {
            const data = await this.equipoHardwareService.createEquipoHardware(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Internal server error");
        }
    }

    async updateEquipoHardware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.equipoHardwareService.updateEquipoHardware(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteEquipoHardware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.equipoHardwareService.deleteEquipoHardware(Number(id));
            return this.httpResponse.OK("Registro de EquipoHardware eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
