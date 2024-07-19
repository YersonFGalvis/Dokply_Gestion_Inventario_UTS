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
exports.SoftwareMiddleware = void 0;
const software_dto_1 = require("../dto/software.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const software_service_1 = require("../services/software.service");
const enums_1 = require("../helpers/enums");
class SoftwareMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _softwareService = new software_service_1.SoftwareService()) {
        this._httpResponse = _httpResponse;
        this._softwareService = _softwareService;
    }
    softwareValidator(req, res, next) {
        const valid = new software_dto_1.SoftwareDTO();
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
    softwareDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const softwareDB = yield this._softwareService.findSoftwareByNombre(nombre);
            if ((softwareDB === null || softwareDB === void 0 ? void 0 : softwareDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Software en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.SoftwareMiddleware = SoftwareMiddleware;
//# sourceMappingURL=software.middleware.js.map