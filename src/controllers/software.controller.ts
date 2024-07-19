import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { SoftwareService } from '../services/software.service';

export class SoftwareController {
    constructor(private readonly softwareService: SoftwareService = new SoftwareService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getSoftware(req: Request, res: Response) {
        try {
            const data = await this.softwareService.findAllSoftwares();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay software creado en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getSoftwareById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.softwareService.findSoftwareById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Software");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createSoftware(req: Request, res: Response) {
        try {
            const data = await this.softwareService.createSoftware(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateSoftware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.softwareService.updateSoftware(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Internal server error");
        }
    }

    async deleteSoftware(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.softwareService.deleteSoftware(Number(id));
            return this.httpResponse.OK("Software eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Internal server error");
        }
    }
}
