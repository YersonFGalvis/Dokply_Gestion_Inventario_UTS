import { NextFunction, Request, Response } from "express";
import { ResponsableDTO } from "../dto/responsable.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { ResponsableService } from "../services/responsable.service";
import { ErrorsType } from "../helpers/enums";

export class ResponsableMiddleware {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse(),    ) {}

    responsableValidator(req: Request, res: Response, next: NextFunction) {

        const valid = new ResponsableDTO();
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
