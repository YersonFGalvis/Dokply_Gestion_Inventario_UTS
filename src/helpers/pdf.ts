import PDFDocument from 'pdfkit-table';

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
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

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();

    doc.font('Helvetica-Bold').fontSize(30).fillColor(colors.primary).text('Reporte del Equipo', { align: 'center' });
    doc.moveDown();


    const table = {
        title: "Detalles del Equipo",
        subtitle: `ID: ${data.id}`,
        headers: ["Item", "Valor"],
        rows: [
            ["ID", `${data.id}`],
            ["Estado", `${data.estado}`],
            ["Marca", `${data.marca}`],
            ["Aula", `${data.aula_id.nombre}`],
            ["Edificio", `${data.aula_id.edificio_id.nombre} (${data.aula_id.edificio_id.letra})`],
        ]
    };


    await doc.table(table, {
        width: 500,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
        prepareRow: (row: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => {
            return doc.font("Helvetica").fontSize(12).fillColor(indexRow! % 2 === 0 ? 'black' : colors.secondary);
        },
    });


    doc.end();
}
