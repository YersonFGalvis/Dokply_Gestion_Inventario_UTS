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
exports.RolService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
class RolService extends serviceConfiguration_1.BaseService {
    constructor() {
        super(entity_1.Rol);
    }
    findRolById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    findRolByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOne({ where: { nombre } });
        });
    }
    createRol(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const newRol = repository.create(body);
            return repository.save(newRol);
        });
    }
    updateRol(id, rolDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            let rolToUpdate = yield repository.findOneBy({ id });
            if (!rolToUpdate) {
                throw new Error(`Rol con id ${id} no encontrado`);
            }
            repository.merge(rolToUpdate, rolDTO);
            try {
                yield repository.save(rolToUpdate);
                return rolToUpdate;
            }
            catch (error) {
                console.error('Error al actualizar el Rol:', error);
                throw error;
            }
        });
    }
    deleteRol(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const rolToDelete = yield repository.findOneBy({ id });
            if (!rolToDelete) {
                throw new Error(`Rol con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(rolToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el Rol:', error);
                throw error;
            }
        });
    }
    findAllRols() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
}
exports.RolService = RolService;
//# sourceMappingURL=rol.service.js.map