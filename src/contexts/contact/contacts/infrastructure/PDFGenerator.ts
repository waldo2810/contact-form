import * as PDFDocument from 'pdfkit';
import { PDFGeneration } from '../domain/PDFGeneration';

export class PDFGenerator implements PDFGeneration {
  public generateTable(config: PDFConfig): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));

    // Add title
    doc
      .fontSize(config.title.fontSize || 16)
      .text(config.title.text, { align: config.title.align || 'center' });
    doc.moveDown();

    this.buildTable(doc, config.table);

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }

  private buildTable(doc: PDFKit.PDFDocument, table: TableConfig): void {
    doc.fontSize(table.headers.fontSize || 8);

    // Define table layout
    const tableTop = 150;
    const tableLeft = 30;
    const cellPadding = 5;
    const rowHeight = 25;

    // Calculate table width
    const tableWidth = table.widths.reduce((sum, width) => sum + width, 0);

    // Draw table headers
    doc.font(table.headers.fontFamily || 'Helvetica-Bold');
    let currentX = tableLeft;
    table.headers.data.forEach((header, i) => {
      doc.text(header, currentX + cellPadding, tableTop, {
        width: table.widths[i] - cellPadding * 2,
        align: 'left',
      });
      currentX += table.widths[i];
    });

    // Draw table row
    doc.font(table.rows.fontFamily || 'Helvetica');
    const y = tableTop + rowHeight;
    currentX = tableLeft;
    table.rows.data.forEach((cell, i) => {
      doc.text(cell, currentX + cellPadding, y + cellPadding, {
        width: table.widths[i] - cellPadding * 2,
        align: 'left',
      });
      currentX += table.widths[i];
    });

    // Draw table lines
    doc.lineWidth(table.lineWidth || 1);
    // Horizontal lines
    for (let i = 0; i <= 2; i++) {
      const y = tableTop + i * rowHeight;
      doc
        .moveTo(tableLeft, y)
        .lineTo(tableLeft + tableWidth, y)
        .stroke();
    }
    // Vertical lines
    currentX = tableLeft;
    for (let i = 0; i <= table.headers.data.length; i++) {
      doc
        .moveTo(currentX, tableTop)
        .lineTo(currentX, tableTop + rowHeight * 2)
        .stroke();
      if (i < table.headers.data.length) {
        currentX += table.widths[i];
      }
    }
  }
}
