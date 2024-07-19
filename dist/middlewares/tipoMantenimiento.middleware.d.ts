import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { TipoMantenimientoService } from "../services/tipoMantenimiento.service";
export declare class TipoMantenimientoMiddleware {
    private readonly _httpResponse;
    private readonly _tipoMantenimientoService;
    constructor(_httpResponse?: HttpResponse, _tipoMantenimientoService?: TipoMantenimientoService);
    tipoMantenimientoValidator(req: Request, res: Response, next: NextFunction): void;
    tipoMantenimientoDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
