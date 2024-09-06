import { NextFunction, Request, Response } from "express";
import { TipoMantenimientoDTO } from "../dto/tipoMantenimiento.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { TipoMantenimientoService } from "../services/tipoMantenimiento.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class TipoMantenimientoMiddleware extends HelperMiddleware{
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _tipoMantenimientoService: TipoMantenimientoService = new TipoMantenimientoService()
    ) {super()};

    tipoMantenimientoValidator(req: Request, res: Response, next: NextFunction) {
        
        const valid = new TipoMantenimientoDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }

    async tipoMantenimientoDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre } = req.body;
        const tipoMantenimientoDB = await this._tipoMantenimientoService.findTipoMantenimientoByNombre(nombre);

        if (tipoMantenimientoDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Tipo de Mantenimiento en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
