"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alertas = void 0;
const typeorm_1 = require("typeorm");
const Equipo_1 = require("./Equipo");
let Alertas = class Alertas {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Alertas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Alertas.prototype, "tipo_alerta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Alertas.prototype, "fecha_hora_generacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Alertas.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipo_1.Equipo, (equipo) => equipo.id),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", Equipo_1.Equipo)
], Alertas.prototype, "equipo_id", void 0);
Alertas = __decorate([
    (0, typeorm_1.Entity)('alertas')
], Alertas);
exports.Alertas = Alertas;
//# sourceMappingURL=Alerta.js.map