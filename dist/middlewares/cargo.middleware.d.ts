import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { CargoService } from "../services/cargo.service";
export declare class CargoMiddleware {
    private readonly _httpResponse;
    private readonly _cargoService;
    constructor(_httpResponse?: HttpResponse, _cargoService?: CargoService);
    cargoValidator(req: Request, res: Response, next: NextFunction): void;
    cargoDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
