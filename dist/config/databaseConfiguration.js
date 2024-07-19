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
exports.DatabaseConfiguration = void 0;
const data_source_1 = require("./data.source");
class DatabaseConfiguration {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataSource) {
                return this.dataSource;
            }
            this.dataSource = yield data_source_1.AppDataSource.initialize();
            return this.dataSource;
        });
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataSource) {
                yield this.dataSource.destroy();
                this.dataSource = null;
            }
        });
    }
    static getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dataSource) {
                throw new Error('La conexión no ha sido establecida.');
            }
            return this.dataSource;
        });
    }
}
exports.DatabaseConfiguration = DatabaseConfiguration;
DatabaseConfiguration.dataSource = null;
//# sourceMappingURL=databaseConfiguration.js.map