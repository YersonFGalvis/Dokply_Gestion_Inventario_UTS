"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressConfiguration = void 0;
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = require("../routes/usuario.routes");
const rol_routes_1 = require("../routes/rol.routes");
const registroMantenimiento_routes_1 = require("../routes/registroMantenimiento.routes");
const auth_routes_1 = require("../routes/auth.routes");
const alerta_routes_1 = require("../routes/alerta.routes");
const area_routes_1 = require("../routes/area.routes");
const cargo_routes_1 = require("../routes/cargo.routes");
const edificio_routes_1 = require("../routes/edificio.routes");
const equipo_routes_1 = require("../routes/equipo.routes");
const hardware_routes_1 = require("../routes/hardware.routes");
const registroEquipo_routes_1 = require("../routes/registroEquipo.routes");
const responsable_routes_1 = require("../routes/responsable.routes");
const software_routes_1 = require("../routes/software.routes");
const tipoMantenimiento_routes_1 = require("../routes/tipoMantenimiento.routes");
const aula_routes_1 = require("../routes/aula.routes");
class expressConfiguration {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number('3001');
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
        this.app.use("/", this.routers());
        this.app.set('view engine', 'pug');
        this.app.set('views', './src/views');
    }
    routers() {
        return [new usuario_routes_1.UsuarioRouter().router,
            new alerta_routes_1.AlertaRouter().router,
            new area_routes_1.AreaRouter().router,
            new aula_routes_1.AulaRouter().router,
            new auth_routes_1.AuthRouter().router,
            new cargo_routes_1.CargoRouter().router,
            new edificio_routes_1.EdificioRouter().router,
            new equipo_routes_1.EquipoRouter().router,
            new hardware_routes_1.HardwareRouter().router,
            new registroEquipo_routes_1.RegistroEquipoRouter().router,
            new registroMantenimiento_routes_1.RegistroMantenimientoRouter().router,
            new responsable_routes_1.ResponsableRouter().router,
            new rol_routes_1.RolRouter().router,
            new software_routes_1.SoftwareRouter().router,
            new tipoMantenimiento_routes_1.TipoMantenimientoRouter().router,
        ];
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Express escuchando en el puerto ${this.port}`);
        });
    }
}
exports.expressConfiguration = expressConfiguration;
//# sourceMappingURL=expressConfiguration.js.map