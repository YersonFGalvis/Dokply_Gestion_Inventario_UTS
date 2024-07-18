import { NextFunction, Request, Response } from "express";
import { AulaDTO } from "../dto/aula.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { AulaService } from "../services/aula.service";
import { ErrorsType } from "../helpers/enums";

export class AulaMiddleware {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _aulaService: AulaService = new AulaService()
    ) {}

    aulaValidator(req: Request, res: Response, next: NextFunction) {

        const valid = new AulaDTO();
        Object.assign(valid, req.body);
        
        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }

    async aulaDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre } = req.body;
        const aulaDB = await this._aulaService.findAulaByNombre(nombre);

        if (aulaDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Aula en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
