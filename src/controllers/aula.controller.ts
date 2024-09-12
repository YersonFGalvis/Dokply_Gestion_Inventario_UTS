import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { AulaService } from '../services/aula.service';

export class AulaController {
    constructor(private readonly aulaService: AulaService = new AulaService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getAulas(req: Request, res: Response) {
        try {
            const data = await this.aulaService.findAllAulas();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay aulas creadas en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getAulaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.aulaService.findAulaById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Aula");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async getAulasByEdificio(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.aulaService.findAulasByEdificio(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existen aulas");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createAula(req: Request, res: Response) {
        try {
            const data = await this.aulaService.createAula(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateAula(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.aulaService.updateAula(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteAula(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.aulaService.deleteAula(Number(id));
            return this.httpResponse.OK("Aula eliminada correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
