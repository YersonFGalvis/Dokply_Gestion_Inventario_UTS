import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
export declare class HelperMiddleware {
    _httpResponse: HttpResponse;
    constructor(_httpResponse?: HttpResponse);
    passAuth(type: string): (req: Request, res: Response, next: NextFunction) => void;
    checkAdminRole(req: Request, res: Response, next: NextFunction): void | {
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    };
}
