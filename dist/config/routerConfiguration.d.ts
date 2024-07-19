import { Router } from "express";
export declare class BaseRouter<T, U> {
    router: Router;
    controller: T;
    middleware: U;
    constructor(Tcontroller: {
        new (): T;
    }, Umiddleware: {
        new (): U;
    });
    routes(): void;
}
