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
exports.RegistroEquipo = void 0;
const typeorm_1 = require("typeorm");
const Equipo_1 = require("./Equipo");
const Responsable_1 = require("./Responsable");
let RegistroEquipo = class RegistroEquipo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegistroEquipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipo_1.Equipo, (equipo) => equipo.id),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", Equipo_1.Equipo)
], RegistroEquipo.prototype, "equipo_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Responsable_1.Responsable, (responsable) => responsable.id),
    (0, typeorm_1.JoinColumn)({ name: 'responsable_id' }),
    __metadata("design:type", Responsable_1.Responsable)
], RegistroEquipo.prototype, "responsable_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], RegistroEquipo.prototype, "fecha_asignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], RegistroEquipo.prototype, "fecha_devolucion", void 0);
RegistroEquipo = __decorate([
    (0, typeorm_1.Entity)('registroequipo')
], RegistroEquipo);
exports.RegistroEquipo = RegistroEquipo;
//# sourceMappingURL=RegistroEquipo.js.map