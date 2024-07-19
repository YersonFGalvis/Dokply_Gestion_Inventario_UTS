import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { RolService } from "../services/rol.service";
export declare class RolMiddleware {
    private readonly _httpResponse;
    private readonly _rolService;
    constructor(_httpResponse?: HttpResponse, _rolService?: RolService);
    rolValidator(req: Request, res: Response, next: NextFunction): void;
    rolDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
