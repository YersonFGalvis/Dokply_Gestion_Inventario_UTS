import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { DatabaseConfiguration } from "./databaseConfiguration";

export class BaseService<T extends ObjectLiteral> {
    private repository: Repository<T> | null = null;

    constructor(private readonly getEntity: EntityTarget<T>) {}

    async getRepository(): Promise<Repository<T>> {
        if (!this.repository) {
            const connection = await DatabaseConfiguration.getConnection();
            this.repository = connection.getRepository(this.getEntity);
        }
        return this.repository;
    }

    async disconnect(): Promise<void> {
        await DatabaseConfiguration.disconnect();
        this.repository = null;
    }
}
