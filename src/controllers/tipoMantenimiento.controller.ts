import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { TipoMantenimientoService } from '../services/tipoMantenimiento.service';

export class TipoMantenimientoController {
    constructor(private readonly tipoMantenimientoService: TipoMantenimientoService = new TipoMantenimientoService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getTipoMantenimientos(req: Request, res: Response) {
        try {
            const data = await this.tipoMantenimientoService.findAllTipoMantenimientos();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay tipos de mantenimiento creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getTipoMantenimientoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.tipoMantenimientoService.findTipoMantenimientoById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Tipo de Mantenimiento");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createTipoMantenimiento(req: Request, res: Response) {
        try {
            const data = await this.tipoMantenimientoService.createTipoMantenimiento(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateTipoMantenimiento(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.tipoMantenimientoService.updateTipoMantenimiento(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Internal server error");
        }
    }

    async deleteTipoMantenimiento(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.tipoMantenimientoService.deleteTipoMantenimiento(Number(id));
            return this.httpResponse.OK("Tipo de Mantenimiento eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Internal server error");
        }
    }
}
