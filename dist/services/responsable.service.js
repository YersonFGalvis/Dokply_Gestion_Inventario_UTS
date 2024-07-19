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
exports.ResponsableService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const cargo_service_1 = require("./cargo.service");
class ResponsableService extends serviceConfiguration_1.BaseService {
    constructor(_cargoService = new cargo_service_1.CargoService()) {
        super(entity_1.Responsable);
        this._cargoService = _cargoService;
    }
    findResponsableById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createResponsable(responsableDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cargo_id, nombre } = responsableDTO;
            const cargo = yield this._cargoService.findCargoById(cargo_id);
            if (!cargo) {
                throw new Error(`Cargo con id ${cargo_id} no encontrado`);
            }
            const newResponsable = new entity_1.Responsable();
            newResponsable.cargo_id = cargo;
            newResponsable.nombre = nombre;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newResponsable);
            }
            catch (error) {
                console.error('Error al crear el Responsable:', error);
                throw error;
            }
        });
    }
    findAllResponsables() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find({ relations: ['cargo_id'] });
        });
    }
    updateResponsable(id, responsableDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            let responsableToUpdate = yield repository.findOneBy({ id });
            if (!responsableToUpdate) {
                throw new Error(`Responsable con id ${id} no encontrado`);
            }
            const { cargo_id, nombre } = responsableDTO;
            const cargo = yield this._cargoService.findCargoById(cargo_id);
            if (!cargo) {
                throw new Error(`Cargo con id ${cargo_id} no encontrado`);
            }
            repository.merge(responsableToUpdate, {
                cargo_id: cargo,
                nombre: nombre
            });
            try {
                yield repository.save(responsableToUpdate);
                return responsableToUpdate;
            }
            catch (error) {
                console.error('Error al actualizar el Responsable:', error);
                throw error;
            }
        });
    }
    deleteResponsable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const responsableToDelete = yield repository.findOneBy({ id });
            if (!responsableToDelete) {
                throw new Error(`Responsable con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(responsableToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el Responsable:', error);
                throw error;
            }
        });
    }
}
exports.ResponsableService = ResponsableService;
//# sourceMappingURL=responsable.service.js.map