import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
export declare class BaseService<T extends ObjectLiteral> {
    private readonly getEntity;
    private repository;
    constructor(getEntity: EntityTarget<T>);
    getRepository(): Promise<Repository<T>>;
    disconnect(): Promise<void>;
}
