import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { EquipoSoftwareService } from '../services/equipoSoftware.service';

export class EquipoSoftwareController {
    constructor(private readonly equipoSoftwareService: EquipoSoftwareService = new EquipoSoftwareService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getEquiposSoftware(req: Request, res: Response) {
        try {
            const data = await this.equipoSoftwareService.findAllEquiposSoftware();

            if (data.length === 0) {
                return this.httpResponse.NotFound("No hay registros de EquiposSoftware creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getEquipoSoftwareById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.equipoSoftwareService.findEquipoSoftwareById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound("No existe el registro de EquipoSoftware");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError(e);
        }
    }

    async createEquipoSoftware(req: Request, res: Response) {
        try {
            const data = await this.equipoSoftwareService.createEquipoSoftware(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Internal server error");
        }
    }

    async updateEquipoSoftware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.equipoSoftwareService.updateEquipoSoftware(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteEquipoSoftware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.equipoSoftwareService.deleteEquipoSoftware(Number(id));
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
