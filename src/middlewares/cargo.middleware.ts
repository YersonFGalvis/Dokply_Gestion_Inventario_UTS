import { NextFunction, Request, Response } from "express";
import { CargoDTO } from "../dto/cargo.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../helpers/http";
import { CargoService } from "../services/cargo.service";
import { ErrorsType } from "../helpers/enums";
import { HelperMiddleware } from "./helper.middleware";

export class CargoMiddleware extends HelperMiddleware{
    constructor(
        public readonly _httpResponse: HttpResponse = new HttpResponse(),
        private readonly _cargoService: CargoService = new CargoService()
    ) {super();}

    cargoValidator(req: Request, res: Response, next: NextFunction) {
   
        const valid = new CargoDTO();
        Object.assign(valid, req.body);

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, ErrorsType.DTO);
            } else {
                next();
            }
        });
    }

    async cargoDuplicateValidator(req: Request, res: Response, next: NextFunction) {
        const { nombre, area_id } = req.body;
        const cargoDB = await this._cargoService.findCargoByNombre(nombre, area_id);

        if (cargoDB?.nombre === nombre) {
            return this._httpResponse.BadRequest("Ya existe el Cargo en el sistema", ErrorsType.Duplicidad);
        } else {
            next();
        }
    }
}
