import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { HardwareService } from "../services/hardware.service";
export declare class HardwareMiddleware {
    private readonly _httpResponse;
    private readonly _hardwareService;
    constructor(_httpResponse?: HttpResponse, _hardwareService?: HardwareService);
    hardwareValidator(req: Request, res: Response, next: NextFunction): void;
    hardwareDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
