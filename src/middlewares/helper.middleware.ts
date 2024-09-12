import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { RoleType } from "../helpers/enums";
import { Usuario } from "../entity";
import { HttpResponse } from "../helpers/http";
import { PayloadToken } from "src/interfaces/auth.interface";

export class HelperMiddleware {
  constructor(public _httpResponse: HttpResponse = new HttpResponse()) {}
  
  passAuth(type: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(type, { session: false }, (err: Error | null, user: Usuario | false, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
        // Redirige al login con un mensaje explicativo en la URL
        const message = encodeURIComponent('Se cerró la sesión, iniciela nuevamente');
        return res.redirect(`/login?error=${message}`);
        }
        req.user = user;
        next(); 
      })(req, res, next);
    };
  }

  checkCoordinadorRole(req: Request, res: Response, next: NextFunction) {
    const { rol_id } = req.user as PayloadToken;
        
    if (rol_id === RoleType.COORDINADOR) {
      return next();
    }

    return res.status(401).json({ message: "No tienes permiso de COORDINADOR" });
  }
  

}