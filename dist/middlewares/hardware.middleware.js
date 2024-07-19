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
exports.HardwareMiddleware = void 0;
const hardware_dto_1 = require("../dto/hardware.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const hardware_service_1 = require("../services/hardware.service");
const enums_1 = require("../helpers/enums");
class HardwareMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse(), _hardwareService = new hardware_service_1.HardwareService()) {
        this._httpResponse = _httpResponse;
        this._hardwareService = _hardwareService;
    }
    hardwareValidator(req, res, next) {
        const valid = new hardware_dto_1.HardwareDTO();
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
    hardwareDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const hardwareDB = yield this._hardwareService.findHardwareByNombre(nombre);
            if ((hardwareDB === null || hardwareDB === void 0 ? void 0 : hardwareDB.nombre) === nombre) {
                return this._httpResponse.BadRequest("Ya existe el Hardware en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.HardwareMiddleware = HardwareMiddleware;
//# sourceMappingURL=hardware.middleware.js.map