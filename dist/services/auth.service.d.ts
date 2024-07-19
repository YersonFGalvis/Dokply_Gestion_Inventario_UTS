import { BaseService } from "../config/serviceConfiguration";
import * as jwt from "jsonwebtoken";
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from "../entity/Usuario";
export declare class AuthService extends BaseService<Usuario> {
    private readonly _usuarioService;
    private readonly jwtInstance;
    constructor(_usuarioService?: UsuarioService, jwtInstance?: typeof jwt);
    validateUser(usuario: string, password: string): Promise<Usuario | null>;
    sign(payload: jwt.JwtPayload, secret: string): string;
    generateJWT(usuario: string, pass: string): Promise<{
        accessToken: string;
        usuarioDB: Usuario | null;
    }>;
}
