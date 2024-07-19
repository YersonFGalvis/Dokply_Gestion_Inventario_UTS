import { Usuario } from "../entity";
import { PassportUse } from "../helpers/passport";
import { AuthService } from "../services/auth.service";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";

const _authService: AuthService = new AuthService();

export class LoginStrategy{
    async validate(usuario:string, password:string,done:any): Promise<Usuario>{

        const usuarioCheck = await _authService.validateUser(usuario,password);

        if(usuarioCheck == null){

            return done(null,false, {message: "Usuario o contraseña invalidos"});
        }

        return done(null,usuarioCheck)

    }

    get use(){
        return PassportUse<LocalStrategy, Object, VerifyFunction>("login",LocalStrategy, {usernameField:"usuario",passwordField:"password"}, this.validate)
    }
}