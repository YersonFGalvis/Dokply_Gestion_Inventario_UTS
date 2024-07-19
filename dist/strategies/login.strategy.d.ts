import { Usuario } from "../entity";
export declare class LoginStrategy {
    validate(usuario: string, password: string, done: any): Promise<Usuario>;
    get use(): void;
}
