import PDFDocument from 'pdfkit-table';

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

function formatDate(date: string | Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        timeZone: 'America/Bogota' // Ajusta la zona horaria si es necesario
    };

    return new Date(date).toLocaleDateString('es-CO', options); // Mostrar solo la fecha
}

export async function createPDFDocument(data: any, writeData: (chunk: Buffer) => void, endStream: () => void) {
    let doc = new PDFDocument();

    doc.on('data', (chunk: Buffer) => {
        writeData(chunk);
    });

    doc.on('end', () => {
        endStream();
    });

    const colors = {
        primary: '#2c3e50',
        secondary: '#3498db',
        lightGray: '#ecf0f1',
    };

    const documentWidth = doc.page.width;
    const documentHeight = doc.page.height;

    const imagePath = 'public/img/Logo-UTS-1.png';
    const imageWidth = 150; // Ancho deseado de la imagen
    const imageHeight = 100; // Alto deseado de la imagen

    const imageX = (documentWidth - imageWidth) / 2;
    const imageY = 50;

    doc.image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });

    doc.moveDown(8);

    doc.font('Helvetica-Bold').fontSize(30).fillColor(colors.primary).text('Reporte del Equipo', { align: 'center' });
    doc.moveDown();

    // Información básica del equipo
    const table = {
        title: "Detalles del Equipo",
        subtitle: `ID: ${data.id}`,
        headers: ["Item", "Valor"],
        rows: [
            ["ID", `${data.id}`],
            ["Estado", `${data.estado}`],
            ["Marca", `${data.marca}`],
            ["Aula", `${data.aula_id?.nombre || 'N/A'}`],
            ["Edificio", `${data.aula_id?.edificio_id?.nombre || 'N/A'} (${data.aula_id?.edificio_id?.letra || 'N/A'})`],
        ]
    };

    await doc.table(table, {
        width: 500,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
        prepareRow: (row: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => {
            return doc.font("Helvetica").fontSize(12).fillColor(indexRow! % 2 === 0 ? 'black' : colors.secondary);
        },
    });

    doc.addPage(); // Añadir nueva página para más detalles

    // Información de Software
    if (data.equipoSoftware && data.equipoSoftware.length > 0) {
        const softwareTable = {
            title: "Software Instalado",
            headers: ["Nombre", "Versión", "Licencia"],
            rows: data.equipoSoftware.map((sw: any) => [
                sw.software_id?.nombre || 'N/A',
                sw.software_id?.version || 'N/A',
                sw.software_id?.licencia || 'N/A'
            ]),
        };

        await doc.table(softwareTable, {
            width: 500,
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
            prepareRow: (row: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => {
                return doc.font("Helvetica").fontSize(12).fillColor(indexRow! % 2 === 0 ? 'black' : colors.secondary);
            },
        });
        doc.moveDown();
    }

    // Información de Hardware
    if (data.equipoHardware && data.equipoHardware.length > 0) {
        const hardwareTable = {
            title: "Hardware Asociado",
            headers: ["Nombre", "Descripción", "Estado"],
            rows: data.equipoHardware.map((hw: any) => [
                hw.hardware_id?.nombre || 'N/A',
                hw.hardware_id?.descripcion || 'N/A',
                hw.hardware_id?.estado || 'N/A'
            ]),
        };

        await doc.table(hardwareTable, {
            width: 500,
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
            prepareRow: (row: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => {
                return doc.font("Helvetica").fontSize(12).fillColor(indexRow! % 2 === 0 ? 'black' : colors.secondary);
            },
        });
        doc.moveDown();
    }

    // Registros de Mantenimiento
    if (data.registroMantenimientos && data.registroMantenimientos.length > 0) {
        const mantenimientoTable = {
            title: "Registros de Mantenimiento",
            headers: ["Fecha", "Tipo de Mantenimiento", "Detalle"],
            rows: data.registroMantenimientos.map((rm: any) => [
                formatDate(rm.fecha) || 'N/A',
                rm.tipo_mantenimiento_id?.nombre || 'N/A',
                rm.detalle || 'N/A'
            ]),
        };

        await doc.table(mantenimientoTable, {
            width: 500,
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
            prepareRow: (row: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => {
                return doc.font("Helvetica").fontSize(12).fillColor(indexRow! % 2 === 0 ? 'black' : colors.secondary);
            },
        });
        doc.moveDown();
    }

    // Información del Responsable
    if (data.responsableEquipos && data.responsableEquipos.length > 0) {
        const responsableTable = {
            title: "Responsable Asignado",
            headers: ["Nombre", "Cargo", "Área", "Teléfono", "Correo Electrónico", "Fecha Asignación", "Fecha Devolución"],
            rows: data.responsableEquipos.map((re: any) => [
                `${re.responsable_id.nombres} ${re.responsable_id.apellidos}`,
                re.responsable_id.cargo_id.nombre,
                re.responsable_id.cargo_id.area_id.nombre,
                re.responsable_id.telefono,
                re.responsable_id.email,
                formatDate(re.fecha_asignacion),
                re.fecha_devolucion ? formatDate(re.fecha_devolucion) : 'N/A'
            ]),
        };

        await doc.table(responsableTable, {
            width: 500,
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
            prepareRow: (row: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => {
                return doc.font("Helvetica").fontSize(12).fillColor(indexRow! % 2 === 0 ? 'black' : colors.secondary);
            },
        });
    }

    doc.end();
}