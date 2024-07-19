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
exports.AulaMiddleware = void 0;
const aula_dto_1 = require("../dto/aula.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const aula_service_1 = require("../services/aula.service");
const enums_1 = require("../helpers/enums");
class AulaMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _aulaService = new aula_service_1.AulaService()) {
        this._httpResponse = _httpResponse;
        this._aulaService = _aulaService;
    }
    aulaValidator(req, res, next) {
        const valid = new aula_dto_1.AulaDTO();
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
    aulaDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const aulaDB = yield this._aulaService.findAulaByNombre(nombre);
            if ((aulaDB === null || aulaDB === void 0 ? void 0 : aulaDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Aula en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.AulaMiddleware = AulaMiddleware;
//# sourceMappingURL=aula.middleware.js.map