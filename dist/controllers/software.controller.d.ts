import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { SoftwareService } from '../services/software.service';
export declare class SoftwareController {
    private readonly softwareService;
    private readonly httpResponse;
    constructor(softwareService?: SoftwareService, httpResponse?: HttpResponse);
    getSoftware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    getSoftwareById(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    createSoftware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    updateSoftware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    deleteSoftware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
}
