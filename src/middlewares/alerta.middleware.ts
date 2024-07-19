import { NextFunction, Request, Response } from "express";
import { AlertaDTO } from "../dto/alerta.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { AlertaService } from "../services/alerta.service";
import { ErrorsType } from "../helpers/enums";

export class AlertaMiddleware {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _alertaService: AlertaService = new AlertaService()
    ) {}

    alertaValidator(req: Request, res: Response, next: NextFunction) {
        
        const valid = new AlertaDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, 'ErrorDTO');
            } else {
                next();
            }
        });
    }

}
