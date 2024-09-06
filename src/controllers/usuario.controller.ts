import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { HttpResponse } from '../helpers/http';
import { UsuarioDTO } from "../dto/usuario.dto";

export class UsuarioController {
  constructor(
    private readonly userService: UsuarioService = new UsuarioService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) { }

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();

      if (data.length === 0) {
        return this.httpResponse.NotFound("No hay usuarios creados en el sistema");
      }

      return this.httpResponse.OK(data)

    } catch (error) {
      return this.httpResponse.ServerError(error)
    }
  }

  async getUserById(req: Request, res: Response, userCookie?: string) {
    let { id } = req.params;
    if (userCookie) id = userCookie
    try {
      const data = await this.userService.findById(Number(id));
      if (!data) {
        return this.httpResponse.NotFound("No existe el Usuario");
      }
      return this.httpResponse.OK(data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.ServerError(e);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { '_method': _, 'confirm_password': confirmPassword, ...cleanedBody } = req.body;
      const data = await this.userService.createUser(cleanedBody);

      return this.httpResponse.OK(data);
    } catch (error) {
      return this.httpResponse.ServerError("Internal server error");
    }
  }

  async getUserWithRolById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRole(Number(id));
      if (!data) {
        return this.httpResponse.NotFound("Usuario encontrado")
      }
      return this.httpResponse.OK(data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.ServerError(e);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { '_method': _, 'confirm_password': confirmPassword, pass, ...cleanedBody } = req.body;

      if (pass && confirmPassword) {
        if (pass === confirmPassword) {
          cleanedBody.pass = pass;
        } else {
          return this.httpResponse.ServerError("Las contraseñas no coinciden");
        }
      }

      const data = await this.userService.updateUser(Number(id), cleanedBody);
      return this.httpResponse.OK(data);
    } catch (error) {
      return this.httpResponse.ServerError("Error interno del servidor");
    }
  }


  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.userService.deleteUser(Number(id));
      if (result.affected === 0) {
        return this.httpResponse.NotFound("Usuario no encontrado");
      }
      return this.httpResponse.OK("Usuario eliminado correctamente");
    } catch (error) {
      return this.httpResponse.ServerError("Error interno del servidor");
    }
  }
}

