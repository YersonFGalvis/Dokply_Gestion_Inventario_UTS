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
exports.AreaMiddleware = void 0;
const area_dto_1 = require("../dto/area.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const area_service_1 = require("../services/area.service");
const enums_1 = require("../helpers/enums");
class AreaMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _areaService = new area_service_1.AreaService()) {
        this._httpResponse = _httpResponse;
        this._areaService = _areaService;
    }
    areaValidator(req, res, next) {
        const valid = new area_dto_1.AreaDTO();
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
    areaDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const areaDB = yield this._areaService.findAreaByNombre(nombre);
            if ((areaDB === null || areaDB === void 0 ? void 0 : areaDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Area en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.AreaMiddleware = AreaMiddleware;
//# sourceMappingURL=area.middleware.js.map