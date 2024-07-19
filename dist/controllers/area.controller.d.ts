import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { AreaService } from '../services/area.service';
export declare class AreaController {
    private readonly areaService;
    private readonly httpResponse;
    constructor(areaService?: AreaService, httpResponse?: HttpResponse);
    getAreas(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    getAreaById(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    createArea(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    updateArea(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    deleteArea(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
}
