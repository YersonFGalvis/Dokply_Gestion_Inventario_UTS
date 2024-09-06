import { NextFunction, Request, Response } from "express";
import { RolDTO } from "../dto/rol.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { RolService } from "../services/rol.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class RolMiddleware extends HelperMiddleware{
    constructor(
                    public readonly _httpResponse:HttpResponse = new HttpResponse,
                    private readonly _rolService:RolService = new RolService()
                ){super();}
    rolValidator(req: Request, res: Response, next: NextFunction){

        const valid = new RolDTO()
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if(err.length > 0){        
                return this._httpResponse.BadRequest(err, ErrorsType.DTO)
            }else{
                next();
            }
        })
       
    }

    async rolDuplicateValidator(req: Request, res: Response, next: NextFunction){
        const { nombre } = req.body;

        const rolDB = await this._rolService.findRolByNombre(nombre)

        if (rolDB?.nombre == nombre) {

            return this._httpResponse.BadRequest("Ya existe el Rol en el sistema", ErrorsType.Duplicidad)
          
        }else{
            next(); 
        }
    }

}