"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaMiddleware = void 0;
const alerta_dto_1 = require("../dto/alerta.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const alerta_service_1 = require("../services/alerta.service");
class AlertaMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _alertaService = new alerta_service_1.AlertaService()) {
        this._httpResponse = _httpResponse;
        this._alertaService = _alertaService;
    }
    alertaValidator(req, res, next) {
        const valid = new alerta_dto_1.AlertaDTO();
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
}
exports.AlertaMiddleware = AlertaMiddleware;
//# sourceMappingURL=alerta.middleware.js.map