"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargoMiddleware = void 0;
const cargo_dto_1 = require("../dto/cargo.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const cargo_service_1 = require("../services/cargo.service");
const enums_1 = require("../helpers/enums");
class CargoMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _cargoService = new cargo_service_1.CargoService()) {
        this._httpResponse = _httpResponse;
        this._cargoService = _cargoService;
    }
    cargoValidator(req, res, next) {
        const valid = new cargo_dto_1.CargoDTO();
        Object.assign(valid, req.body);
        (0, class_validator_1.validate)(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, enums_1.ErrorsType.DTO);
            }
            else {
                next();
            }
        });
    }
    cargoDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const cargoDB = yield this._cargoService.findCargoByNombre(nombre);
            if ((cargoDB === null || cargoDB === void 0 ? void 0 : cargoDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Cargo en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.CargoMiddleware = CargoMiddleware;
//# sourceMappingURL=cargo.middleware.js.map