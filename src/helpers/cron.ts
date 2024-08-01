import cron from 'node-cron';
import { BrevoEmailService } from './email';
import { IEmailService } from 'src/interfaces/email.interface';
import { IMantenimientos } from 'src/interfaces/email.interface';
import { DatabaseConfiguration } from '../config/databaseConfiguration';

// Función para obtener mantenimientos
async function obtenerMantenimientos(): Promise<IMantenimientos[]> {
    try {
        const connection = await DatabaseConfiguration.getConnection(); 
        const entityManager = connection.manager;
        const resultados: IMantenimientos[] = await entityManager.query('SELECT * FROM obtener_mantenimientos()');
        return resultados;
    } catch (error) {
        console.error('Error al obtener mantenimientos:', error);
        return [];
    }
}

// Función cron para mandar email
export async function CronMandarEmail(): Promise<void> {

    // cron.schedule('0 0 1 1,6 *', () => {
    //     console.log('Ejecutando');
    // });

    cron.schedule('*/1 * * * *', async () => {
        try {

            let Mantenimientos:IMantenimientos[] = await obtenerMantenimientos();

            let emailService: IEmailService = new BrevoEmailService(
                process.env.API_KEY_EMAIL!,
                'Yerson Galvis', // Nombre del remitente
                'Yersongalvis03@gmail.com', // Email del remitente
                Mantenimientos,
                'RESUMEN MANTENIMIENTO PROXIMO DE EQUIPOS UTS', // Asunto del email
                'UTS', // Nombre de la dirección de respuesta
                'Yersongalvis03@gmail.com', // Email de la dirección de respuesta
                { "Custom-Header": "Gestion de Inventarios UTS" }, // Cabeceras personalizadas
                { "parameter": "Gestion de Inventarios UTS", "subject": "Gestion de Inventarios UTS" } // Parámetros personalizados
            );

            //Enviar el email
            await emailService.sendEmail();
        } catch (error) {
            console.error('Error en el cron job:', error);
        }
    });
}