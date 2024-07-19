"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const Config = {
    type: "postgres",
    host: "68.183.24.4",
    port: 5432,
    username: "postgres",
    password: "a7y5dJlyrZy7LJaP",
    database: "Gestion_Inventario_UTS",
    entities: [entity_1.Alertas, entity_1.Area, entity_1.Aula, entity_1.Cargo, entity_1.Edificio, entity_1.Equipo, entity_1.Hardware, entity_1.RegistroMantenimiento, entity_1.Responsable, entity_1.RegistroEquipo, entity_1.Rol, entity_1.Software, entity_1.TipoMantenimiento, entity_1.Usuario],
    migrations: [__dirname + "/../migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    extra: {
        connectTimeoutMS: 30000 // 30 segundos
    }
};
exports.AppDataSource = new typeorm_1.DataSource(Config);
//# sourceMappingURL=data.source.js.map