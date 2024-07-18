import { NextFunction, Request, Response } from "express";
import { HardwareDTO } from "../dto/hardware.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { HardwareService } from "../services/hardware.service";
import { ErrorsType } from "../helpers/enums";

export class HardwareMiddleware {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _hardwareService: HardwareService = new HardwareService()
    ) {}

    hardwareValidator(req: Request, res: Response, next: NextFunction) {

        const valid = new HardwareDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }

    async hardwareDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre } = req.body;
        const hardwareDB = await this._hardwareService.findHardwareByNombre(nombre);

        if (hardwareDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Hardware en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
