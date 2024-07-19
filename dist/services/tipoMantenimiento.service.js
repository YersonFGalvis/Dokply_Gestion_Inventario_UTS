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
exports.TipoMantenimientoService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
class TipoMantenimientoService extends serviceConfiguration_1.BaseService {
    constructor() {
        super(entity_1.TipoMantenimiento);
    }
    findTipoMantenimientoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createTipoMantenimiento(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const newTipoMantenimiento = repository.create(body);
            return repository.save(newTipoMantenimiento);
        });
    }
    findTipoMantenimientoByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOne({ where: { nombre } });
        });
    }
    findAllTipoMantenimientos() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateTipoMantenimiento(id, tipoMantenimientoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            let tipoMantenimientoToUpdate = yield repository.findOneBy({ id });
            if (!tipoMantenimientoToUpdate) {
                throw new Error(`Tipo de Mantenimiento con id ${id} no encontrado`);
            }
            repository.merge(tipoMantenimientoToUpdate, tipoMantenimientoDTO);
            try {
                yield repository.save(tipoMantenimientoToUpdate);
                return tipoMantenimientoToUpdate;
            }
            catch (error) {
                console.error('Error al actualizar el Tipo de Mantenimiento:', error);
                throw error;
            }
        });
    }
    deleteTipoMantenimiento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const tipoMantenimientoToDelete = yield repository.findOneBy({ id });
            if (!tipoMantenimientoToDelete) {
                throw new Error(`Tipo de Mantenimiento con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(tipoMantenimientoToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el Tipo de Mantenimiento:', error);
                throw error;
            }
        });
    }
}
exports.TipoMantenimientoService = TipoMantenimientoService;
//# sourceMappingURL=tipoMantenimiento.service.js.map