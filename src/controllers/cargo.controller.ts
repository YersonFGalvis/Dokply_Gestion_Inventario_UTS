import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { CargoService } from '../services/cargo.service';

export class CargoController {
    constructor(private readonly cargoService: CargoService = new CargoService(),
                private readonly httpResponse: HttpResponse = new HttpResponse()){}

    async getCargos(req: Request, res: Response) {
        try {
            const data = await this.cargoService.findAllCargos();

            if (data.length === 0) {
                return this.httpResponse.NotFound( "No hay cargos creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getCargoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.cargoService.findCargoById(Number(id));
            if (!data) {
                return this.httpResponse.NotFound( "No existe el Cargo");
            }
            return this.httpResponse.OK(data);
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError( e);
        }
    }

    async createCargo(req: Request, res: Response) {
        try {
            const data = await this.cargoService.createCargo(req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");
        }
    }

    async updateCargo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.cargoService.updateCargo(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteCargo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.cargoService.deleteCargo(Number(id));
            return this.httpResponse.OK("Cargo eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
