import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { HardwareService } from '../services/hardware.service';

export class HardwareController {
    constructor(private readonly hardwareService: HardwareService = new HardwareService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getHardware(req: Request, res: Response) {
        try {
            const data = await this.hardwareService.findAllHardwares();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay hardware creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getHardwareById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.hardwareService.findHardwareById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Hardware");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createHardware(req: Request, res: Response) {
        try {
            const data = await this.hardwareService.createHardware(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateHardware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.hardwareService.updateHardware(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteHardware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.hardwareService.deleteHardware(Number(id));
            return this.httpResponse.OK("Hardware eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
