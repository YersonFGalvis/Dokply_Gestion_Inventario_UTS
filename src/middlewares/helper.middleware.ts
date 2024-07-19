import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { RoleType } from "../helpers/enums";
import { Usuario } from "../entity";
import { HttpResponse } from "../helpers/http";
import { PayloadToken } from "../interfaces/auth.interface";

export class HelperMiddleware {
  constructor(public _httpResponse: HttpResponse = new HttpResponse()) {}
  

  passAuth(type: string) {

    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(type, { session: false }, (err: Error | null, user: Usuario | false, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          const message = info?.message || 'Unauthorized';
          return this._httpResponse.Unauthorized(message);
        }
        req.user = user;
        next();
      })(req, res, next);
    };
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const payload = req.user as { usuario_id: number, rol: RoleType };
    
    if (payload.rol !== RoleType.ADMIN) {
      return this._httpResponse.Unauthorized( "No tienes permiso de ADMINISTRADOR");
    }
    return next();
  }
}