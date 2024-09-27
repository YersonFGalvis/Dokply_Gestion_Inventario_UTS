import { IEmailService, IMantenimientos } from "src/interfaces/email.interface";
import { Equipo } from '../entity/Equipo';
const brevo = require('@getbrevo/brevo');

export class BrevoEmailService implements IEmailService {
    public senderName: string;
    public senderEmail: string;
    public subject: string;
    public replyToName: string;
    public replyToEmail: string;
    public Mantenimientos: IMantenimientos[];
    public EquiposHtml: string = "";
    public Apikey: string;
    public ApiInstance: any;
    public ApiSmtpConfigurations: any;
    public headers: { [key: string]: string };
    public params: { [key: string]: any };

    constructor(
        Apikey: string,
        senderName: string,
        senderEmail: string,
        mantenimientos: IMantenimientos[],
        subject: string,
        replyToName: string,
        replyToEmail: string,
        headers: { [key: string]: string } = {},
        params: { [key: string]: any } = {}
    ) {
        this.senderName = senderName;
        this.senderEmail = senderEmail;
        this.subject = subject;
        this.replyToName = replyToName;
        this.replyToEmail = replyToEmail;
        this.Mantenimientos = mantenimientos;
        this.Apikey = Apikey;
        this.headers = headers;
        this.params = params;
        this.ApiInstance = new brevo.TransactionalEmailsApi();
        this.ApiSmtpConfigurations = new brevo.SendSmtpEmail();
    }


    private generarTemplateCompleto(nombre:string): string {

        let Html:string = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Correo para ${nombre}</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.4;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                font-size: 14px; /* Tamaño de fuente reducido */
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 15px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                background-color: #C3D730;
                color: #fff;
            }
            .header h1 {
                margin: 0;
                font-size: 18px; /* Ajuste del tamaño del título */
            }
            .content {
                padding: 10px 0;
            }
            .content p {
                margin: 0 0 10px;
                font-size: 14px;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                background-color: #f4f4f4;
                color: #777;
                font-size: 12px;
            }
            .table-container {
                margin-top: 20px;
                overflow-x: auto;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                table-layout: fixed; /* Controla el desbordamiento */
                word-wrap: break-word; /* Permite que el texto se ajuste */
            }
            table, th, td {
                border: 1px solid #ddd;
            }
            th, td {
                padding: 8px;
                text-align: left;
                font-size: 12px; /* Tamaño de fuente reducido para tablas */
            }
            th {
                background-color: #f4f4f4;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Hola ${nombre}</h1>
                </div>
                <div class="content">
                    <h2>Resumen del estado de los equipos registrados en el sistema hasta la fecha</h2>   
                    <div class="table-container">
                        <table>
                            <tr>                               
                                <th>Equipo</th>
                                <th>Detalles</th>
                            </tr>
                            ${this.EquiposHtml}
                        </table>
                    </div>
                </div>
                <div class="footer">
                    <p>Gestion de Inventarios UTS</p>
                </div>
            </div>
        </body>
        </html>
        `
        return Html;
    }

    private generarEquiposTemplate(): void {
        this.EquiposHtml = this.Mantenimientos.map(equipo => `
            <tr>
            <td>
                <strong>ID:</strong> ${equipo.id}<br>
                <strong>Marca:</strong> ${equipo.marca}<br>
                <strong>Estado:</strong> ${equipo.estado}
            </td>
            <td>
                <strong>Último Mantenimiento:</strong> ${new Date(equipo.ultimomantenimiento).toLocaleDateString()}<br>
                <strong>Aula:</strong> ${equipo.aula}<br>
                <strong>Edificio:</strong> ${equipo.edificio}<br>
                <strong>Responsable:</strong> ${equipo.nombreresponsable}<br>
                <strong>Email:</strong> ${equipo.emailresponsable}<br>
                <strong>Tipo de Mantenimiento:</strong> ${equipo.tipomantenimiento}<br>
                <strong>Requiere Mantenimiento:</strong> ${equipo.mantenimientorequiere}
            </td>
        </tr>
        `).join('');
    }
    
    sendEmail() {
        let apiKey = this.ApiInstance.authentications['apiKey'];
        apiKey.apiKey = this.Apikey;
    
        this.generarEquiposTemplate();
    
        let ResponsablesUnicos: string[] = [];
    
        this.Mantenimientos.forEach((equipo) => {
            let responsables = equipo.correostodoslosusuarios.split(',');
            responsables.forEach(responsable => {
                if (!ResponsablesUnicos.includes(responsable.trim())) {
                    ResponsablesUnicos.push(responsable.trim());
                }
            });
        });
    
        // Ahora solo procesamos una vez cada responsable
        const emailPromises = ResponsablesUnicos.map(responsable => {
            const [nombre, email] = responsable.split(' ');

                let Html = this.generarTemplateCompleto(nombre);

                this.ApiSmtpConfigurations.subject = this.subject;
                this.ApiSmtpConfigurations.htmlContent = Html;
                this.ApiSmtpConfigurations.sender = { name: this.senderName, email: this.senderEmail };
                this.ApiSmtpConfigurations.to = [{ email: email, name: nombre}];
                this.ApiSmtpConfigurations.replyTo = { email: this.replyToEmail, name: this.replyToName };
                this.ApiSmtpConfigurations.headers = this.headers;
                this.ApiSmtpConfigurations.params = this.params;
    
                //Retornar la promesa de envío de correo  
                return this.ApiInstance.sendTransacEmail(this.ApiSmtpConfigurations);        
        })  
    
        Promise.all(emailPromises).then(
            (results: any) => {
                results.forEach((data: any) => {
                    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                });
            },
            (errors: any) => {
                console.error(errors);
            }
        );
    }  
}
