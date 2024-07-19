import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { EdificioService } from "../services/edificio.service";
export declare class EdificioMiddleware {
    private readonly _httpResponse;
    private readonly _edificioService;
    constructor(_httpResponse?: HttpResponse, _edificioService?: EdificioService);
    edificioValidator(req: Request, res: Response, next: NextFunction): void;
    edificioDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
