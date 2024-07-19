import { Router } from "express";

export class BaseRouter<T,U>{
    public router: Router;
    public controller: T;
    public middleware: U

    constructor(  Tcontroller: {new():T},  Umiddleware: {new():U} ){    
        this.router = Router();
        this.controller = new Tcontroller();
        this.middleware = new Umiddleware
        this.routes();
    }

    routes(){}
}