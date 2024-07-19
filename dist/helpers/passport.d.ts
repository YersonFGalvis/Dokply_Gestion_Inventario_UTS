import { Strategy as LocalStrategy } from "passport-local";
import { StrategyOptionsWithRequest } from "passport-jwt";
declare type TypeStrategy<T, U, X> = {
    new (params: U, callback: X): T;
};
declare type JwtCallbackWithReq = (req: any, payload: any, done: (error: any, user?: any) => void) => void;
export declare function PassportUse<T extends LocalStrategy, U, X>(name: string, Strategy: TypeStrategy<T, U, X>, params: U, callback: X): void;
export declare function PassportUseJwtWithReq(name: string, params: StrategyOptionsWithRequest, callback: JwtCallbackWithReq): void;
export {};
