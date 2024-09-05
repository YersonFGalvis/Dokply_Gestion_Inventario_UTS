import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { EquipoService } from '../services/equipo.service';

export class EquipoController {
    constructor(private readonly equipoService: EquipoService = new EquipoService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getEquipos(req: Request, res: Response) {
        try {
            const data = await this.equipoService.findAllEquipos();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay equipos creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getEquipoById(req: Request, res: Response){
        const { id, pdf } = req.params;
        try {
            const data = await this.equipoService.findEquipoById(Number(id));

            if (!data) {
                return this.httpResponse.NotFound("No existe el Equipo");
            }
            if (pdf) {
                return data;
            } else {
                // res.render('QR', { equipo: data });
                return this.httpResponse.OK(data);
            }
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError(e);
        }
    }

    async createEquipo(req: Request, res: Response) {
        try {
            console.log({data: req.body});
            const data = await this.equipoService.createEquipo(req.body);
            
            // fetch('/ruta-al-servidor', {
            //     method: 'POST',
            //     body: formData
            //   }).then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch(error => console.error('Error:', error));

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateEquipo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.equipoService.updateEquipo(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteEquipo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.equipoService.deleteEquipo(Number(id));
            return this.httpResponse.OK("Equipo eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
