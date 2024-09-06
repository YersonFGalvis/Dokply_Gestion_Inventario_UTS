import { NextFunction, Request, Response } from "express";
import { EdificioDTO } from "../dto/edificio.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { EdificioService } from "../services/edificio.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class EdificioMiddleware extends HelperMiddleware{
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _edificioService: EdificioService = new EdificioService()
    ) {super();}

    edificioValidator(req: Request, res: Response, next: NextFunction) {
        
        const valid = new EdificioDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, 'ErrorDTO');
            } else {
                next();
            }
        });
    }

    async edificioDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre } = req.body;
        const edificioDB = await this._edificioService.findEdificioByNombre(nombre);

        if (edificioDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Edificio en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
