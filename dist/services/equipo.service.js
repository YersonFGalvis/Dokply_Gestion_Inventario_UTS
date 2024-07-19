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
exports.EquipoService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const aula_service_1 = require("./aula.service");
class EquipoService extends serviceConfiguration_1.BaseService {
    constructor(_aulaService = new aula_service_1.AulaService()) {
        super(entity_1.Equipo);
        this._aulaService = _aulaService;
    }
    findEquipoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository
                .createQueryBuilder('equipo')
                .leftJoinAndSelect('equipo.aula_id', 'aula')
                .leftJoinAndSelect('aula.edificio_id', 'edificio')
                .where('equipo.id = :id', { id })
                .getOne();
        });
    }
    createEquipo(equipoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { aula_id, estado, marca } = equipoDTO;
            const aula = yield this._aulaService.findAulaById(aula_id);
            if (!aula) {
                throw new Error(`Aula con id ${aula_id} no encontrada`);
            }
            const newEquipo = new entity_1.Equipo();
            newEquipo.aula_id = aula;
            newEquipo.estado = estado;
            newEquipo.marca = marca;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newEquipo);
            }
            catch (error) {
                console.error('Error al crear el equipo:', error);
                throw error;
            }
        });
    }
    findAllEquipos() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find({ relations: ['aula_id'] });
        });
    }
    updateEquipo(id, equipoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const equipoToUpdate = yield repository.findOneBy({ id });
            if (!equipoToUpdate) {
                throw new Error(`Equipo con id ${id} no encontrado`);
            }
            const aula = yield this._aulaService.findAulaById(equipoDTO.aula_id);
            if (!aula) {
                throw new Error(`Aula con id ${equipoDTO.aula_id} no encontrada`);
            }
            repository.merge(equipoToUpdate, {
                aula_id: aula,
                estado: equipoDTO.estado,
                marca: equipoDTO.marca
            });
            try {
                return yield repository.save(equipoToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el equipo:', error);
                throw error;
            }
        });
    }
    deleteEquipo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const equipoToDelete = yield repository.findOneBy({ id });
            if (!equipoToDelete) {
                throw new Error(`Equipo con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(equipoToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el equipo:', error);
                throw error;
            }
        });
    }
}
exports.EquipoService = EquipoService;
//# sourceMappingURL=equipo.service.js.map