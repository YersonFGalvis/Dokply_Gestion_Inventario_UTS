import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { EquipoService } from "../services/equipo.service";
export declare class EquipoMiddleware {
    private readonly _httpResponse;
    private readonly _equipoService;
    constructor(_httpResponse?: HttpResponse, _equipoService?: EquipoService);
    equipoValidator(req: Request, res: Response, next: NextFunction): void;
}
