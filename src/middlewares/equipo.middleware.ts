import { NextFunction, Request, Response } from "express";
import { EquipoDTO } from "../dto/equipo.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { EquipoService } from "../services/equipo.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class EquipoMiddleware extends HelperMiddleware{
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _equipoService: EquipoService = new EquipoService()
    ) {super();}

    equipoValidator(req: Request, res: Response, next: NextFunction) {
   
        const valid = new EquipoDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }


}
