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
exports.AlertaService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const equipo_service_1 = require("./equipo.service");
class AlertaService extends serviceConfiguration_1.BaseService {
    constructor(_equipoService = new equipo_service_1.EquipoService()) {
        super(entity_1.Alertas);
        this._equipoService = _equipoService;
    }
    findAlertaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createAlerta(alertaDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo_alerta, fecha_hora_generacion, estado, equipo_id } = alertaDTO;
            const equipo = yield this._equipoService.findEquipoById(equipo_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${equipo_id} no encontrado`);
            }
            const newAlerta = new entity_1.Alertas();
            newAlerta.tipo_alerta = tipo_alerta;
            newAlerta.fecha_hora_generacion = fecha_hora_generacion;
            newAlerta.estado = estado;
            newAlerta.equipo_id = equipo;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newAlerta);
            }
            catch (error) {
                console.error('Error al crear la alerta:', error);
                throw error;
            }
        });
    }
    findAllAlertas() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateAlerta(id, alertaDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const alertaToUpdate = yield repository.findOneBy({ id });
            if (!alertaToUpdate) {
                throw new Error(`Alerta con id ${id} no encontrada`);
            }
            const equipo = yield this._equipoService.findEquipoById(alertaDTO.equipo_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${alertaDTO.equipo_id} no encontrado`);
            }
            repository.merge(alertaToUpdate, {
                tipo_alerta: alertaDTO.tipo_alerta,
                fecha_hora_generacion: alertaDTO.fecha_hora_generacion,
                estado: alertaDTO.estado,
                equipo_id: equipo
            });
            try {
                return yield repository.save(alertaToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar la alerta:', error);
                throw error;
            }
        });
    }
    deleteAlerta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const alertaToDelete = yield repository.findOneBy({ id });
            if (!alertaToDelete) {
                throw new Error(`Alerta con id ${id} no encontrada`);
            }
            try {
                yield repository.remove(alertaToDelete);
            }
            catch (error) {
                console.error('Error al eliminar la alerta:', error);
                throw error;
            }
        });
    }
}
exports.AlertaService = AlertaService;
//# sourceMappingURL=alerta.service.js.map