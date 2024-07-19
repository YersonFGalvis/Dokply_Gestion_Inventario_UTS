import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { RegistroEquipoService } from "../services/registroEquipo.service";
export declare class RegistroEquipoMiddleware {
    private readonly _httpResponse;
    private readonly _registroEquipoService;
    constructor(_httpResponse?: HttpResponse, _registroEquipoService?: RegistroEquipoService);
    registroEquipoValidator(req: Request, res: Response, next: NextFunction): void;
}
