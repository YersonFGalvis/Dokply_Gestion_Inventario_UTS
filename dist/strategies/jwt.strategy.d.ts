import { PayloadToken } from "../interfaces/auth.interface";
export declare class JwtStrategy {
    constructor();
    validate(req: any, payLoad: PayloadToken, done: (error: any, user?: any) => void): Promise<void>;
    get use(): void;
}
