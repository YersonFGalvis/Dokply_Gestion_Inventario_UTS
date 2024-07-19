import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { ResponsableService } from "../services/responsable.service";
export declare class ResponsableMiddleware {
    private readonly _httpResponse;
    private readonly _responsableService;
    constructor(_httpResponse?: HttpResponse, _responsableService?: ResponsableService);
    responsableValidator(req: Request, res: Response, next: NextFunction): void;
}
