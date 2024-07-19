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
exports.RegistroEquipoService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const equipo_service_1 = require("./equipo.service");
const responsable_service_1 = require("./responsable.service");
class RegistroEquipoService extends serviceConfiguration_1.BaseService {
    constructor(_equipoService = new equipo_service_1.EquipoService(), _responsableService = new responsable_service_1.ResponsableService()) {
        super(entity_1.RegistroEquipo);
        this._equipoService = _equipoService;
        this._responsableService = _responsableService;
    }
    findRegistroEquipoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createRegistroEquipo(registroEquipoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { equipo_id, responsable_id, fecha_asignacion, fecha_devolucion } = registroEquipoDTO;
            const equipo = yield this._equipoService.findEquipoById(equipo_id);
            const responsable = yield this._responsableService.findResponsableById(responsable_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${equipo_id} no encontrado`);
            }
            if (!responsable) {
                throw new Error(`Responsable con id ${responsable_id} no encontrado`);
            }
            const newRegistroEquipo = new entity_1.RegistroEquipo();
            newRegistroEquipo.equipo_id = equipo;
            newRegistroEquipo.responsable_id = responsable;
            newRegistroEquipo.fecha_asignacion = new Date(fecha_asignacion);
            newRegistroEquipo.fecha_devolucion = fecha_devolucion ? new Date(fecha_devolucion) : null;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newRegistroEquipo);
            }
            catch (error) {
                console.error('Error al crear el Registro Equipo:', error);
                throw error;
            }
        });
    }
    findAllRegistroEquipos() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateRegistroEquipo(id, registroEquipoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const registroEquipoToUpdate = yield repository.findOneBy({ id });
            if (!registroEquipoToUpdate) {
                throw new Error(`RegistroEquipo con id ${id} no encontrado`);
            }
            const equipo = yield this._equipoService.findEquipoById(registroEquipoDTO.equipo_id);
            const responsable = yield this._responsableService.findResponsableById(registroEquipoDTO.responsable_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${registroEquipoDTO.equipo_id} no encontrado`);
            }
            if (!responsable) {
                throw new Error(`Responsable con id ${registroEquipoDTO.responsable_id} no encontrado`);
            }
            repository.merge(registroEquipoToUpdate, {
                equipo_id: equipo,
                responsable_id: responsable,
                fecha_asignacion: new Date(registroEquipoDTO.fecha_asignacion),
                fecha_devolucion: registroEquipoDTO.fecha_devolucion ? new Date(registroEquipoDTO.fecha_devolucion) : null
            });
            try {
                return yield repository.save(registroEquipoToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el registro de equipo:', error);
                throw error;
            }
        });
    }
    deleteRegistroEquipo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const registroEquipoToDelete = yield repository.findOneBy({ id });
            if (!registroEquipoToDelete) {
                throw new Error(`RegistroEquipo con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(registroEquipoToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el registro de equipo:', error);
                throw error;
            }
        });
    }
}
exports.RegistroEquipoService = RegistroEquipoService;
//# sourceMappingURL=registroEquipo.service.js.map