"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroEquipoMiddleware = void 0;
const registroEquipo_dto_1 = require("../dto/registroEquipo.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const registroEquipo_service_1 = require("../services/registroEquipo.service");
const enums_1 = require("../helpers/enums");
class RegistroEquipoMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _registroEquipoService = new registroEquipo_service_1.RegistroEquipoService()) {
        this._httpResponse = _httpResponse;
        this._registroEquipoService = _registroEquipoService;
    }
    registroEquipoValidator(req, res, next) {
        const valid = new registroEquipo_dto_1.RegistroEquipoDTO();
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
}
exports.RegistroEquipoMiddleware = RegistroEquipoMiddleware;
//# sourceMappingURL=registroEquipo.middleware.js.map