import express from 'express';
export declare class expressConfiguration {
    app: express.Application;
    private port;
    constructor();
    routers(): Array<express.Router>;
    listen(): void;
}
