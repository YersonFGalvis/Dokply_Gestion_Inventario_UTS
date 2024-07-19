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
exports.EdificioMiddleware = void 0;
const edificio_dto_1 = require("../dto/edificio.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const edificio_service_1 = require("../services/edificio.service");
const enums_1 = require("../helpers/enums");
class EdificioMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _edificioService = new edificio_service_1.EdificioService()) {
        this._httpResponse = _httpResponse;
        this._edificioService = _edificioService;
    }
    edificioValidator(req, res, next) {
        const valid = new edificio_dto_1.EdificioDTO();
        Object.assign(valid, req.body);
        (0, class_validator_1.validate)(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, 'ErrorDTO');
            }
            else {
                next();
            }
        });
    }
    edificioDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const edificioDB = yield this._edificioService.findEdificioByNombre(nombre);
            if ((edificioDB === null || edificioDB === void 0 ? void 0 : edificioDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Edificio en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.EdificioMiddleware = EdificioMiddleware;
//# sourceMappingURL=edificio.middleware.js.map