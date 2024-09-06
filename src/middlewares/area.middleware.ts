import { NextFunction, Request, Response } from "express";
import { AreaDTO } from "../dto/area.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { AreaService } from "../services/area.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class AreaMiddleware extends HelperMiddleware {
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _areaService: AreaService = new AreaService()
    ) {super();}

    areaValidator(req: Request, res: Response, next: NextFunction) {
        
        const valid = new AreaDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }

    async areaDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre } = req.body;
        const areaDB = await this._areaService.findAreaByNombre(nombre);

        if (areaDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Area en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
