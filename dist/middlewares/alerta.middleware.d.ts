import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { AlertaService } from "../services/alerta.service";
export declare class AlertaMiddleware {
    private readonly _httpResponse;
    private readonly _alertaService;
    constructor(_httpResponse?: HttpResponse, _alertaService?: AlertaService);
    alertaValidator(req: Request, res: Response, next: NextFunction): void;
}
