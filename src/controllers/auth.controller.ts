import { Request, Response } from "express";
import { HttpResponse } from "../helpers/http"
import { AuthService } from "../services/auth.service";

export class AuthController extends AuthService {
  constructor(
    private readonly _httpResponse: HttpResponse = new HttpResponse()
  ) {
    super();
  }

  async login(req: Request, res: Response) {
    try {
      
      const {usuario,password} = req.body;

      const encode = await this.generateJWT(usuario,password);

      res.header("Content-Type", "application/json");
      res.cookie('user', encode.usuarioDB?.id);
      res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 }).redirect('/dashboard');
      // res.write(JSON.stringify(encode));
      res.end();
    } catch (err) {
      console.error(err);
      return this._httpResponse.ServerError(err);
    }
  }
}