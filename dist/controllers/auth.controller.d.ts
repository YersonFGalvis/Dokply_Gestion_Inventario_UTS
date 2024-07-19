import { Request, Response } from "express";
import { HttpResponse } from "../helpers/http";
import { AuthService } from "../services/auth.service";
export declare class AuthController extends AuthService {
    private readonly _httpResponse;
    constructor(_httpResponse?: HttpResponse);
    login(req: Request, res: Response): Promise<{
        status: import("../helpers/http").HttpStatus;
        statusMessage: string;
        error: any;
    } | undefined>;
}
