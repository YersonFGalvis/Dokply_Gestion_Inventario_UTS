import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { EquipoService } from '../services/equipo.service';
import axios from 'axios';
import moment from 'moment-timezone';

export class EquipoController {
    constructor(private readonly equipoService: EquipoService = new EquipoService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    async getEquipos(req: Request, res: Response) {
        try {
            const data = await this.equipoService.findAllEquipos();

            if (data.length === 0) {
                return this.httpResponse.NotFound("No hay equipos creados en el sistema");
            }

            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError(error);
        }
    }

    async getEquipoById(req: Request, res: Response) {
        const { id, pdf } = req.params;
        try {
            const data = await this.equipoService.findEquipoById(Number(id));

            if (!data) {
                return this.httpResponse.NotFound("No existe el Equipo");
            }
            if (pdf) {
                return data;
            } else {
                return this.httpResponse.OK(data);
            }
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError(e);
        }
    }

    async getEquiposByAula(req: Request, res: Response) {
        const { id, pdf } = req.params;
        try {
            const data = await this.equipoService.findEquiposByAula(Number(id));

            if (!data) {
                return this.httpResponse.NotFound("No existen Equipos");
            }
            else {
                return this.httpResponse.OK(data);
            }
        } catch (e: any) {
            console.error(e);
            return this.httpResponse.ServerError(e);
        }
    }

    async createEquipo(req: Request, res: Response) {
        try {
            const data = await this.equipoService.createEquipo(req.body);
            const equipo_id = data.id;
            const baseURL = `${req.protocol}://${req.get('host')}`;

            const fecha_asignacion = moment().tz("America/Bogota").format("YYYY-MM-DD");

            const hardwareData: number[] = Array.isArray(req.body['equipoHardware[]']) ? req.body['equipoHardware[]'] : [req.body['equipoHardware[]']];
            const softwareData: number[] = Array.isArray(req.body['equipoSoftware[]']) ? req.body['equipoSoftware[]'] : [req.body['equipoSoftware[]']];
            const responsable_id = req.body.responsable_id;

            const hardwareRequests = hardwareData.map((hardware_id: number) => {
                return axios.post(`${baseURL}/crear/equipoHardware`, { equipo_id, hardware_id });
            });

            const softwareRequests = softwareData.map((software_id: number) => {
                return axios.post(`${baseURL}/crear/equipoSoftware`, { equipo_id, software_id });
            });

            let responsableRequests: Promise<any>[] = [];
            if (responsable_id) {
                responsableRequests = [
                    axios.post(`${baseURL}/crear/registroEquipo`, { equipo_id, responsable_id, fecha_asignacion })
                ];
            }

            await Promise.all([...hardwareRequests, ...softwareRequests, responsableRequests]);

            return this.httpResponse.OK(data);
        } catch (error) {
            console.error(error);
            return this.httpResponse.ServerError("Internal server error");
        }
    }

    async updateEquipo(req: Request, res: Response) {
        const { id } = req.params;
        const equipo_id = id;
        const { responsable_id: nuevoResponsableId } = req.body;
        const baseURL = `${req.protocol}://${req.get('host')}`;

        try {
            const response = await fetch(`${baseURL}/registroEquipo/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const registroEquipoUltimo = await response.json();

            if (!response.ok || !registroEquipoUltimo || registroEquipoUltimo.length === 0 || registroEquipoUltimo.error) {
                const nuevaFechaAsignacion = new Date(new Date().setHours(0, 0, 0, 0));
                await axios.post(`${baseURL}/crear/registroEquipo`, { responsable_id: nuevoResponsableId, equipo_id: id, fecha_asignacion: nuevaFechaAsignacion });
            }

            if (registroEquipoUltimo.data.responsable_id.id != nuevoResponsableId) {
                const fechaDevolucion = new Date(new Date().setHours(0, 0, 0, 0));
                await axios.put(`${baseURL}/registroEquipo/${registroEquipoUltimo.data.id}`, { fecha_devolucion: fechaDevolucion });

                const nuevaFechaAsignacion = new Date(new Date().setHours(0, 0, 0, 0));
                await axios.post(`${baseURL}/crear/registroEquipo`, { responsable_id: nuevoResponsableId, equipo_id: id, fecha_asignacion: nuevaFechaAsignacion });
            }

            const responseEquipoHardware = await fetch(`${baseURL}/equipoHardware/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const registroEquipoHardware = await responseEquipoHardware.json();
            console.log({ registroEquipoHardware });

            await axios.delete(`${baseURL}/equipoHardware/${id}`);

            const responseEquipoSoftware = await fetch(`${baseURL}/equipoSoftware/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const registroEquipoSoftware = await responseEquipoSoftware.json();
            console.log({ registroEquipoSoftware });

            await axios.delete(`${baseURL}/equipoSoftware/${id}`);

            const hardwareData: number[] = Array.isArray(req.body['equipoHardware[]'])
                ? req.body['equipoHardware[]'].map(Number)
                : [Number(req.body['equipoHardware[]'])];

            const softwareData: number[] = Array.isArray(req.body['equipoSoftware[]'])
                ? req.body['equipoSoftware[]'].map(Number)
                : [Number(req.body['equipoSoftware[]'])];

            const hardwareRequests = hardwareData.map((hardware_id: number) => {
                return axios.post(`${baseURL}/crear/equipoHardware`, { equipo_id, hardware_id })
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => {
                        console.error(`Error al crear el hardware ID ${hardware_id}:`, error.message);
                        return null;
                    });
            });

            const softwareRequests = softwareData.map((software_id: number) => {
                return axios.post(`${baseURL}/crear/equipoSoftware`, { equipo_id, software_id })
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => {
                        console.error(`Error al crear el software ID ${software_id}:`, error.message);
                        return null;
                    });
            });

            const data = await this.equipoService.updateEquipo(Number(id), req.body);
            return this.httpResponse.OK(data);
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }

    async deleteEquipo(req: Request, res: Response) {
        const { id } = req.params;
        const baseURL = `${req.protocol}://${req.get('host')}`;

        try {
            await axios.delete(`${baseURL}/equipoHardware/${id}`);
            await axios.delete(`${baseURL}/equipoSoftware/${id}`);
            await axios.delete(`${baseURL}/registroMantenimiento/${id}`);
            await axios.delete(`${baseURL}/registroEquipo/${id}`);

            await this.equipoService.deleteEquipo(Number(id));
            return this.httpResponse.OK("Equipo eliminado correctamente");
        } catch (error) {
            return this.httpResponse.ServerError("Error interno del servidor");
        }
    }
}
