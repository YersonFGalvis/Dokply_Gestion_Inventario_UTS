import { NextFunction, Request, Response } from "express";
import { SoftwareDTO } from "../dto/software.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { SoftwareService } from "../services/software.service";
import { ErrorsType } from "../helpers/enums";

export class SoftwareMiddleware {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _softwareService: SoftwareService = new SoftwareService()
    ) {}

    softwareValidator(req: Request, res: Response, next: NextFunction) {
        
        const valid = new SoftwareDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }

    async softwareDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre } = req.body;
        const softwareDB = await this._softwareService.findSoftwareByNombre(nombre);

        if (softwareDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Software en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
