import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { EdificioService } from '../services/edificio.service';

export class EdificioController {
    constructor(private readonly edificioService: EdificioService = new EdificioService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getEdificios(req: Request, res: Response) {
        try {
            const data = await this.edificioService.findAllEdificios();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay edificios creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getEdificioById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.edificioService.findEdificioById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Edificio");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createEdificio(req: Request, res: Response) {
        try {
            const data = await this.edificioService.createEdificio(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateEdificio(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.edificioService.updateEdificio(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteEdificio(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.edificioService.deleteEdificio(Number(id));
            return this.httpResponse.OK("Edificio eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
