import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { SoftwareService } from "../services/software.service";
export declare class SoftwareMiddleware {
    private readonly _httpResponse;
    private readonly _softwareService;
    constructor(_httpResponse?: HttpResponse, _softwareService?: SoftwareService);
    softwareValidator(req: Request, res: Response, next: NextFunction): void;
    softwareDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
