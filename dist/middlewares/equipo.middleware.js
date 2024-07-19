"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoMiddleware = void 0;
const equipo_dto_1 = require("../dto/equipo.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const equipo_service_1 = require("../services/equipo.service");
const enums_1 = require("../helpers/enums");
class EquipoMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _equipoService = new equipo_service_1.EquipoService()) {
        this._httpResponse = _httpResponse;
        this._equipoService = _equipoService;
    }
    equipoValidator(req, res, next) {
        const valid = new equipo_dto_1.EquipoDTO();
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
exports.EquipoMiddleware = EquipoMiddleware;
//# sourceMappingURL=equipo.middleware.js.map