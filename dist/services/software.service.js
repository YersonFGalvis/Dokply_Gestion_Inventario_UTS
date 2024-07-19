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
exports.SoftwareService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const equipo_service_1 = require("./equipo.service");
class SoftwareService extends serviceConfiguration_1.BaseService {
    constructor(_equipoService = new equipo_service_1.EquipoService()) {
        super(entity_1.Software);
        this._equipoService = _equipoService;
    }
    findSoftwareById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createSoftware(softwareDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, version, licencia, equipo_id } = softwareDTO;
            const equipo = yield this._equipoService.findEquipoById(equipo_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${equipo_id} no encontrado`);
            }
            const newSoftware = new entity_1.Software();
            newSoftware.nombre = nombre;
            newSoftware.version = version;
            newSoftware.licencia = licencia;
            newSoftware.equipo_id = equipo;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newSoftware);
            }
            catch (error) {
                console.error('Error al crear el Software:', error);
                throw error;
            }
        });
    }
    findSoftwareByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOne({ where: { nombre } });
        });
    }
    findAllSoftwares() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateSoftware(id, softwareDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            let softwareToUpdate = yield repository.findOneBy({ id });
            if (!softwareToUpdate) {
                throw new Error(`Responsable con id ${id} no encontrado`);
            }
            const { nombre, version, licencia, equipo_id } = softwareDTO;
            const equipo = yield this._equipoService.findEquipoById(equipo_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${equipo_id} no encontrado`);
            }
            repository.merge(softwareToUpdate, {
                nombre: nombre,
                version: version,
                licencia: licencia,
                equipo_id: equipo
            });
            try {
                return yield repository.save(softwareToUpdate);
            }
            catch (error) {
                console.error(`Error al actualizar el software con id ${id}:`, error);
                throw error;
            }
        });
    }
    deleteSoftware(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const softwareToDelete = yield repository.findOneBy({ id });
            if (!softwareToDelete) {
                throw new Error(`Software con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(softwareToDelete);
            }
            catch (error) {
                console.error(`Error al eliminar el software con id ${id}:`, error);
                throw error;
            }
        });
    }
}
exports.SoftwareService = SoftwareService;
//# sourceMappingURL=software.service.js.map