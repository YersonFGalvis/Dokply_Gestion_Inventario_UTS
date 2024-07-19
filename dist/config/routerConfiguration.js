"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
class BaseRouter {
    constructor(Tcontroller, Umiddleware) {
        this.router = (0, express_1.Router)();
        this.controller = new Tcontroller();
        this.middleware = new Umiddleware;
        this.routes();
    }
    routes() { }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=routerConfiguration.js.map