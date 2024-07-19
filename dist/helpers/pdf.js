"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPDFDocument = void 0;
const pdfkit_table_1 = __importDefault(require("pdfkit-table"));
function createPDFDocument(data, writeData, endStream) {
    return __awaiter(this, void 0, void 0, function* () {
        let doc = new pdfkit_table_1.default();
        doc.on('data', (chunk) => {
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
                ["Código QR", `${data.codigo_qr}`],
                ["Estado", `${data.estado}`],
                ["Marca", `${data.marca}`],
                ["Aula", `${data.aula_id.nombre}`],
                ["Edificio", `${data.aula_id.edificio_id.nombre} (${data.aula_id.edificio_id.letra})`],
            ]
        };
        yield doc.table(table, {
            width: 500,
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.secondary),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                return doc.font("Helvetica").fontSize(12).fillColor(indexRow % 2 === 0 ? 'black' : colors.secondary);
            },
        });
        doc.end();
    });
}
exports.createPDFDocument = createPDFDocument;
//# sourceMappingURL=pdf.js.map