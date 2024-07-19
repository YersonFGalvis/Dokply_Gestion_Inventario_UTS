import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { AreaService } from "../services/area.service";
export declare class AreaMiddleware {
    private readonly _httpResponse;
    private readonly _areaService;
    constructor(_httpResponse?: HttpResponse, _areaService?: AreaService);
    areaValidator(req: Request, res: Response, next: NextFunction): void;
    areaDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
