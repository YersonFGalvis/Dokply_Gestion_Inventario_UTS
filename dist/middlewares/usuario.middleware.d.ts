import { NextFunction, Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { HelperMiddleware } from "./helper.middleware";
export declare class UsuarioMiddleware extends HelperMiddleware {
    private readonly _usuarioService;
    constructor(_usuarioService?: UsuarioService);
    usuarioValidator(req: Request, res: Response, next: NextFunction): void;
    usuarioEmailDuplicateValidator(req: Request, res: Response, next: NextFunction): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    } | undefined>;
}
