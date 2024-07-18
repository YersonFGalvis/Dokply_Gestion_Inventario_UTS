import { NextFunction, Request, Response } from "express";
import { UsuarioDTO } from "../dto/usuario.dto";
import { validate } from "class-validator";
import { UsuarioService } from "../services/usuario.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";


export class UsuarioMiddleware extends HelperMiddleware{
    constructor(private readonly _usuarioService:UsuarioService = new UsuarioService())
    { super();}
    usuarioValidator(req: Request, res: Response, next: NextFunction){

        const { nombre, email, pass, rol } = req.body;

        const valid = new UsuarioDTO()

        valid.nombre = nombre
        valid.email = email
        valid.pass = pass
        valid.rol = Number(rol)

        validate(valid).then((err) => {
            if(err.length > 0){
                return this._httpResponse.BadRequest(err, ErrorsType.DTO)
            }else{
                next();
            }
        })
       
    }

    async usuarioEmailDuplicateValidator(req: Request, res: Response, next: NextFunction){
        const { email} = req.body;

        const emailDB = await this._usuarioService.findByEmail(email);

        if (emailDB?.email == email) {
            return this._httpResponse.BadRequest("Ya existe el email en el sistema", ErrorsType.Duplicidad)  
        }else{
            next(); 
        }
    }

}