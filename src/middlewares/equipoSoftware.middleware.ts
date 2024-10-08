import { NextFunction, Request, Response } from "express";
import { EquipoSoftwareDTO } from "../dto/equipoSoftware.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { EquipoSoftwareService } from "../services/equipoSoftware.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class EquipoSoftwareMiddleware extends HelperMiddleware{
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _equipoSoftwareService: EquipoSoftwareService = new EquipoSoftwareService()
    ) {super();}

    equipoSoftwareValidator(req: Request, res: Response, next: NextFunction) {
        const valid = new EquipoSoftwareDTO();
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
