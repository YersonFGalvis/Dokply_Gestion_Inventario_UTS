import express from 'express';
import cookieParser from 'cookie-parser';
import { UsuarioRouter } from '../routes/usuario.routes';import { RolRouter } from '../routes/rol.routes';
import { RegistroMantenimientoRouter } from '../routes/registroMantenimiento.routes';
import { AuthRouter } from '../routes/auth.routes';
import { AreaRouter } from '../routes/area.routes';
import { CargoRouter } from '../routes/cargo.routes';
import { EdificioRouter } from '../routes/edificio.routes';
import { EquipoRouter } from '../routes/equipo.routes';
import { HardwareRouter } from '../routes/hardware.routes';
import { RegistroEquipoRouter } from '../routes/registroEquipo.routes';
import { ResponsableRouter } from '../routes/responsable.routes';
import { SoftwareRouter } from '../routes/software.routes';
import { TipoMantenimientoRouter } from '../routes/tipoMantenimiento.routes';
import { AulaRouter } from '../routes/aula.routes';
import { EquipoHardwareRouter } from '../routes/equipoHardware.routes';
import { EquipoSoftwareRouter } from '../routes/equipoSoftware.routes';

export class expressConfiguration {
    public app: express.Application = express();
    private port: number = Number('3001');

    constructor() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.static('public'));
      this.app.use(cookieParser());
      this.app.use("/", this.routers());
      this.app.set('view engine', 'pug');
      this.app.set('views', './src/views');
      this.app.use((req, res, next) => {
        res.status(404).render('auth/errores', {
          error_code: 404,
          error_title: 'Página No Encontrada',
          error_message: 'Lo sentimos, la página que buscas no existe.'
        });
      });
      this.app.use((req, res, next) => {
        res.status(500).render('auth/errores', {
          error_code: 500,
          error_title: 'Ocurrio un error',
          error_message: 'Contacte con el administrador.'
        });
      });
    }

    routers(): Array<express.Router> {
        return [new UsuarioRouter().router, 
            new AreaRouter().router,
            new AulaRouter().router,
            new AuthRouter().router,
            new CargoRouter().router,
            new EdificioRouter().router,
            new EquipoRouter().router,
            new HardwareRouter().router,
            new RegistroEquipoRouter().router, 
            new RegistroMantenimientoRouter().router, 
            new ResponsableRouter().router, 
            new RolRouter().router, 
            new SoftwareRouter().router, 
            new TipoMantenimientoRouter().router, 
            new EquipoHardwareRouter().router, 
            new EquipoSoftwareRouter().router
        ];
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Express escuchando en el puerto ${this.port}`);
        });
    }

}
