export interface PDFGeneration {
  generateTable(config: PDFConfig): Promise<Buffer>;
}
