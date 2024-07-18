import { Request, Response } from 'express';
import { RegistroMantenimientoService } from '../services/registroMantenimientos.service';
import { HttpResponse } from '../helpers/http';


export class RegistroMantenimientoController{
    constructor(private readonly registroMantenimientoService: RegistroMantenimientoService = new RegistroMantenimientoService()
    ,private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getRegistroMantenimientos(req: Request, res: Response) {
    try {
        const data = await this.registroMantenimientoService.findAllRegistroMantenimiento();

        if(data.length === 0) {
            return this.httpResponse.NotFound("No hay mantenimientos creados en el sistema");
        }

        return this.httpResponse.OK(data)
        
    } catch (error) {
        return this.httpResponse.ServerError(error)
    }
    }

    async getRegistroMantenimientoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.registroMantenimientoService.findRegistroMantenimientoById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el registro de Equipo");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createRegistroMantenimiento(req: Request, res: Response) {
        try {
            const data = await this.registroMantenimientoService.createRegistroMantenimiento(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateRegistroMantenimiento(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.registroMantenimientoService.updateRegistroMantenimiento(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteRegistroMantenimiento(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.registroMantenimientoService.deleteRegistroMantenimiento(Number(id));
            return this.httpResponse.OK("Registro de mantenimiento eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}

