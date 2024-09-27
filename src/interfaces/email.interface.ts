export interface IEmailService {
    senderName: string;
    senderEmail: string;
    subject: string;
    sendEmail(): void;
}

export interface IMantenimientos {
  id: number;
  ultimomantenimiento: Date;
  estado: string;
  marca: string;
  aula: string;
  edificio: string;
  nombreresponsable: string;
  nombreusuario:string;
  emailusuario: string;
  emailresponsable: string;
  tipomantenimiento: string;
  mantenimientorequiere: string;
  correostodoslosusuarios: string;
}
  