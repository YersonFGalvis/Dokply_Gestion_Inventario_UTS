import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { RoleType } from "../helpers/enums";
import { Usuario } from "../entity";
import { HttpResponse } from "../helpers/http";
import { PayloadToken } from "src/interfaces/auth.interface";
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from "../services/auth.service";

export class HelperMiddleware {
  constructor(public readonly _httpResponse: HttpResponse = new HttpResponse()
  ,public readonly _usuarioService: UsuarioService = new UsuarioService()
  ,public readonly _authService: AuthService = new AuthService()

) {}
  
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

    return res.status(401).render('auth/errores', {
      error_code: 401,
      error_title: 'Acceso Denegado',
      error_message: 'No tienes permiso de COORDINADOR'
    });
  }

  
  async usuarioActivoValidator(req: Request, res: Response, next: NextFunction){
    const { usuario} = req.body; 

    const activo = await this._usuarioService.findActivoByEmail(usuario)

     if (activo?.activo !== true) {
         const message = encodeURIComponent('Usuario o Contraseña Incorrectos');
        return res.redirect(`/login?error=${message}`);
    }else{
        next(); 
    }
  }


  async usuarioValidoValidator(req: Request, res: Response, next: NextFunction){
    const { usuario, password} = req.body; 

    const usuarioCheck = await this._authService.validateUser(usuario,password);

     if (usuarioCheck == null) {
         const message = encodeURIComponent('Usuario o Contraseña Incorrectos');
        return res.redirect(`/login?error=${message}`);
    }else{
        next(); 
    }
  }

}