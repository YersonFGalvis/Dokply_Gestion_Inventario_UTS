import { BaseService } from "../config/serviceConfiguration";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from "../entity/Usuario";
import { PayloadToken } from "../interfaces/auth.interface";


export class AuthService extends BaseService<Usuario> {
  constructor(
    private readonly _usuarioService: UsuarioService = new UsuarioService(),
    private readonly jwtInstance = jwt,
  ) {
    super(Usuario);
  }

  public async validateUser(usuario: string,password: string): Promise<Usuario | null>  {
      const usuarioByEmail = await this._usuarioService.findPasswordByEmail(usuario);
      const usuarioByNombre = await this._usuarioService.findPasswordByUsername(usuario);

      if (usuarioByNombre) {
        const isMatch = await bcrypt.compare(password, usuarioByNombre.pass);
        if (isMatch) {
          return usuarioByNombre;
        }
      }

      if (usuarioByEmail) {
        const isMatch = await bcrypt.compare(password, usuarioByEmail.pass);
        if (isMatch) {
          return usuarioByEmail;
        }
      }

      return null;
  }

  //JWT_SECRET

  sign(payload: jwt.JwtPayload, secret: string): string {
    return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" });
  }

  public async generateJWT(usuario:string,pass:string): Promise<{ accessToken: string; usuarioDB: Usuario | null }> {

    const usuarioDB = await this.validateUser(usuario,pass);

    const payload: PayloadToken = {
      rol_id: usuarioDB!.rol_id,
      id: usuarioDB!.id,
    };

    if (usuarioDB) {
      usuarioDB.pass = "Not permission";
    }

    return {
      accessToken: this.sign(payload, 'MyS3Cr3t'),
      usuarioDB,
    };
  }
}
