import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { AlertaService } from '../services/alerta.service';

export class AlertaController {
    constructor(private readonly alertaService: AlertaService = new AlertaService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getAlertas(req: Request, res: Response) {
        try {
            const data = await this.alertaService.findAllAlertas();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay alertas creadas en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getAlertaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.alertaService.findAlertaById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe la Alerta");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createAlerta(req: Request, res: Response) {
        try {
            const data = await this.alertaService.createAlerta(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateAlerta(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.alertaService.updateAlerta(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteAlerta(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.alertaService.deleteAlerta(Number(id));
            return this.httpResponse.OK("Alerta eliminada correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
