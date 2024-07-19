"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsableMiddleware = void 0;
const responsable_dto_1 = require("../dto/responsable.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const responsable_service_1 = require("../services/responsable.service");
const enums_1 = require("../helpers/enums");
class ResponsableMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _responsableService = new responsable_service_1.ResponsableService()) {
        this._httpResponse = _httpResponse;
        this._responsableService = _responsableService;
    }
    responsableValidator(req, res, next) {
        const valid = new responsable_dto_1.ResponsableDTO();
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
exports.ResponsableMiddleware = ResponsableMiddleware;
//# sourceMappingURL=responsable.middleware.js.map