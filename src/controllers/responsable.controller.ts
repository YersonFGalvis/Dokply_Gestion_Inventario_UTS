import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { ResponsableService } from '../services/responsable.service';

export class ResponsableController {
    constructor(private readonly responsableService: ResponsableService = new ResponsableService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getResponsables(req: Request, res: Response) {
        try {
            const data = await this.responsableService.findAllResponsables();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay responsables creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getResponsableById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.responsableService.findResponsableById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Responsable");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createResponsable(req: Request, res: Response) {
        try {
            const data = await this.responsableService.createResponsable(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateResponsable(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.responsableService.updateResponsable(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteResponsable(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.responsableService.deleteResponsable(Number(id));
            return this.httpResponse.OK("Responsable eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
