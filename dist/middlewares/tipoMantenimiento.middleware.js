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
exports.TipoMantenimientoMiddleware = void 0;
const tipoMantenimiento_dto_1 = require("../dto/tipoMantenimiento.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const tipoMantenimiento_service_1 = require("../services/tipoMantenimiento.service");
const enums_1 = require("../helpers/enums");
class TipoMantenimientoMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _tipoMantenimientoService = new tipoMantenimiento_service_1.TipoMantenimientoService()) {
        this._httpResponse = _httpResponse;
        this._tipoMantenimientoService = _tipoMantenimientoService;
    }
    tipoMantenimientoValidator(req, res, next) {
        const valid = new tipoMantenimiento_dto_1.TipoMantenimientoDTO();
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
    tipoMantenimientoDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const tipoMantenimientoDB = yield this._tipoMantenimientoService.findTipoMantenimientoByNombre(nombre);
            if ((tipoMantenimientoDB === null || tipoMantenimientoDB === void 0 ? void 0 : tipoMantenimientoDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Tipo de Mantenimiento en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.TipoMantenimientoMiddleware = TipoMantenimientoMiddleware;
//# sourceMappingURL=tipoMantenimiento.middleware.js.map