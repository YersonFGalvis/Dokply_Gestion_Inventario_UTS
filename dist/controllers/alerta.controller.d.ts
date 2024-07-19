import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { AlertaService } from '../services/alerta.service';
export declare class AlertaController {
    private readonly alertaService;
    private readonly httpResponse;
    constructor(alertaService?: AlertaService, httpResponse?: HttpResponse);
    getAlertas(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    getAlertaById(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    createAlerta(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    updateAlerta(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    deleteAlerta(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
}
