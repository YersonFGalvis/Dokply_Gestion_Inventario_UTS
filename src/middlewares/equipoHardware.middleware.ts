import { NextFunction, Request, Response } from "express";
import { EquipoHardwareDTO } from "../dto/equipoHardware.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { EquipoHardwareService } from "../services/equipoHardware.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class EquipoHardwareMiddleware extends HelperMiddleware{
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _equipoHardwareService: EquipoHardwareService = new EquipoHardwareService()
    ) {super();}

    equipoHardwareValidator(req: Request, res: Response, next: NextFunction) {
        const valid = new EquipoHardwareDTO();
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
