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
exports.CargoController = void 0;
const http_1 = require("../helpers/http");
const cargo_service_1 = require("../services/cargo.service");
class CargoController {
    constructor(cargoService = new cargo_service_1.CargoService(), httpResponse = new http_1.HttpResponse()) {
        this.cargoService = cargoService;
        this.httpResponse = httpResponse;
    }
    getCargos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.cargoService.findAllCargos();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay cargos creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getCargoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.cargoService.findCargoById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Cargo");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.cargoService.createCargo(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.cargoService.updateCargo(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.cargoService.deleteCargo(Number(id));
                return this.httpResponse.OK("Cargo eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.CargoController = CargoController;
//# sourceMappingURL=cargo.controller.js.map