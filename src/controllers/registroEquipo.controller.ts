import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { RegistroEquipoService } from '../services/registroEquipo.service';

export class RegistroEquipoController {
    constructor(private readonly registroEquipoService: RegistroEquipoService = new RegistroEquipoService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getRegistroEquipos(req: Request, res: Response) {
        try {
            const data = await this.registroEquipoService.findAllRegistroEquipos();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay Registros de equipos creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getRegistroEquipoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.registroEquipoService.findRegistroEquipoById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el registro de Equipo");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createRegistroEquipo(req: Request, res: Response) {
        try {
            const data = await this.registroEquipoService.createRegistroEquipo(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateRegistroEquipo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.registroEquipoService.updateRegistroEquipo(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteRegistroEquipo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.registroEquipoService.deleteRegistroEquipo(Number(id));
            return this.httpResponse.OK("Registro de equipo eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
