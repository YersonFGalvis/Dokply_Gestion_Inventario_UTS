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
exports.BaseService = void 0;
const databaseConfiguration_1 = require("./databaseConfiguration");
class BaseService {
    constructor(getEntity) {
        this.getEntity = getEntity;
        this.repository = null;
    }
    getRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.repository) {
                const connection = yield databaseConfiguration_1.DatabaseConfiguration.getConnection();
                this.repository = connection.getRepository(this.getEntity);
            }
            return this.repository;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield databaseConfiguration_1.DatabaseConfiguration.disconnect();
            this.repository = null;
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=serviceConfiguration.js.map