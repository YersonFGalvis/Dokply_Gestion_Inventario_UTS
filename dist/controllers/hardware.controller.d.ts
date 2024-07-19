import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { HardwareService } from '../services/hardware.service';
export declare class HardwareController {
    private readonly hardwareService;
    private readonly httpResponse;
    constructor(hardwareService?: HardwareService, httpResponse?: HttpResponse);
    getHardware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    getHardwareById(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    }>;
    createHardware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    updateHardware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
    deleteHardware(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        data: any;
    } | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    }>;
}
