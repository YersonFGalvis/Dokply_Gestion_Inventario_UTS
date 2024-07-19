import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { EquipoService } from '../services/equipo.service';
export declare class EquipoController {
    private readonly equipoService;
    private readonly httpResponse;
    constructor(equipoService?: EquipoService, httpResponse?: HttpResponse);
    getEquipos(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    getEquipoById(req: Request, res: Response): Promise<import("../entity").Equipo | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | undefined>;
    createEquipo(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    updateEquipo(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    deleteEquipo(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
}
