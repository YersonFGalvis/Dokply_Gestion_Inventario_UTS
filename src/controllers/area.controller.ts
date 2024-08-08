import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { AreaService } from '../services/area.service';

export class AreaController {
    constructor(
        private readonly areaService: AreaService = new AreaService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getAreas(req: Request, res: Response) {
        try {
            const data = await this.areaService.findAllAreas();
            
            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay áreas creadas en el sistema");
            }

            return this.httpResponse.OK(data);
        
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getAreaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.areaService.findAreaById(Number(id));
            if (!data) {
                const a = this.httpResponse.NotFound( "No existe el Área");
                return this.httpResponse.NotFound( "No existe el Área");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createArea(req: Request, res: Response) {
        try {
            const data = await this.areaService.createArea(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateArea(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.areaService.updateArea(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteArea(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.areaService.deleteArea(Number(id));
            return this.httpResponse.OK("Área eliminada correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
