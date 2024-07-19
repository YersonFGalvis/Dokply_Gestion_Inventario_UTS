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
exports.AreaService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
class AreaService extends serviceConfiguration_1.BaseService {
    constructor() {
        super(entity_1.Area);
    }
    findAreaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createArea(areaDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = areaDTO;
            const newArea = new entity_1.Area();
            newArea.nombre = nombre;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newArea);
            }
            catch (error) {
                console.error('Error al crear el área:', error);
                throw error;
            }
        });
    }
    findAreaByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ nombre });
        });
    }
    findAllAreas() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateArea(id, areaDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const areaToUpdate = yield repository.findOneBy({ id });
            if (!areaToUpdate) {
                throw new Error(`Área con id ${id} no encontrada`);
            }
            repository.merge(areaToUpdate, { nombre: areaDTO.nombre });
            try {
                return yield repository.save(areaToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el área:', error);
                throw error;
            }
        });
    }
    deleteArea(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const areaToDelete = yield repository.findOneBy({ id });
            if (!areaToDelete) {
                throw new Error(`Área con id ${id} no encontrada`);
            }
            try {
                yield repository.remove(areaToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el área:', error);
                throw error;
            }
        });
    }
}
exports.AreaService = AreaService;
//# sourceMappingURL=area.service.js.map