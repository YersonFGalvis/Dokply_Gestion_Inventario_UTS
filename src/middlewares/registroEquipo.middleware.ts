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
    ) { }

    registroEquipoValidator(req: Request, res: Response, next: NextFunction) {
        const valid = new RegistroEquipoDTO();

        valid.equipo_id = Number(req.body.equipo_id);
        valid.responsable_id = Number(req.body.responsable_id);

        valid.fecha_asignacion = new Date(req.body.fecha_asignacion);
        valid.fecha_asignacion.setHours(0, 0, 0, 0);

        Object.assign(valid, {
            equipo_id: valid.equipo_id,
            responsable_id: valid.responsable_id,
            fecha_asignacion: valid.fecha_asignacion
        });

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }
}