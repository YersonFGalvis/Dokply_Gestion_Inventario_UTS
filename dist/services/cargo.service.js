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
exports.CargoService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const area_service_1 = require("./area.service");
class CargoService extends serviceConfiguration_1.BaseService {
    constructor(_areaService = new area_service_1.AreaService()) {
        super(entity_1.Cargo);
        this._areaService = _areaService;
    }
    findCargoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createCargo(cargoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { area_id, nombre } = cargoDTO;
            const area = yield this._areaService.findAreaById(area_id);
            if (!area) {
                throw new Error(`Área con id ${area_id} no encontrada`);
            }
            const newCargo = new entity_1.Cargo();
            newCargo.area_id = area;
            newCargo.nombre = nombre;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newCargo);
            }
            catch (error) {
                console.error('Error al crear el cargo:', error);
                throw error;
            }
        });
    }
    findCargoByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOne({ where: { nombre } });
        });
    }
    findAllCargos() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find({ relations: ['area_id'] });
        });
    }
    updateCargo(id, cargoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const cargoToUpdate = yield repository.findOneBy({ id });
            if (!cargoToUpdate) {
                throw new Error(`Cargo con id ${id} no encontrado`);
            }
            const area = yield this._areaService.findAreaById(cargoDTO.area_id);
            if (!area) {
                throw new Error(`Área con id ${cargoDTO.area_id} no encontrada`);
            }
            repository.merge(cargoToUpdate, {
                area_id: area,
                nombre: cargoDTO.nombre
            });
            try {
                return yield repository.save(cargoToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el cargo:', error);
                throw error;
            }
        });
    }
    deleteCargo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const cargoToDelete = yield repository.findOneBy({ id });
            if (!cargoToDelete) {
                throw new Error(`Cargo con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(cargoToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el cargo:', error);
                throw error;
            }
        });
    }
}
exports.CargoService = CargoService;
//# sourceMappingURL=cargo.service.js.map