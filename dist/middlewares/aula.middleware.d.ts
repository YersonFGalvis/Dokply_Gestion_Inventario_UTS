import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { AulaService } from "../services/aula.service";
export declare class AulaMiddleware {
    private readonly _httpResponse;
    private readonly _aulaService;
    constructor(_httpResponse?: HttpResponse, _aulaService?: AulaService);
    aulaValidator(req: Request, res: Response, next: NextFunction): void;
    aulaDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
