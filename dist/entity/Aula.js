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
exports.Aula = void 0;
const typeorm_1 = require("typeorm");
const Edificio_1 = require("./Edificio");
const Equipo_1 = require("./Equipo");
let Aula = class Aula {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Aula.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aula.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Edificio_1.Edificio, (edificio) => edificio.id),
    (0, typeorm_1.JoinColumn)({ name: 'edificio_id' }),
    __metadata("design:type", Edificio_1.Edificio)
], Aula.prototype, "edificio_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Equipo_1.Equipo, (equipo) => equipo.aula_id),
    __metadata("design:type", Array)
], Aula.prototype, "equipos", void 0);
Aula = __decorate([
    (0, typeorm_1.Entity)()
], Aula);
exports.Aula = Aula;
//# sourceMappingURL=Aula.js.map