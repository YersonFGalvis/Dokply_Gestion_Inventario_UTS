import { NextFunction, Request, Response } from "express";
import { RegistroEquipoDTO } from "../dto/registroEquipo.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { RegistroEquipoService } from "../services/registroEquipo.service";
import { ErrorsType } from "../helpers/enums";

export class RegistroEquipoMiddleware {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _registroEquipoService: RegistroEquipoService = new RegistroEquipoService()
    ) {}

    registroEquipoValidator(req: Request, res: Response, next: NextFunction) {
        
        const valid = new RegistroEquipoDTO();
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
