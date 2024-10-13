import { Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactNotFoundException } from '../../domain/exceptions/ContactNotFoundException';
import { PDFGeneration } from '../../domain/PDFGeneration';
import { ContactId } from '../../domain/value-objects/ContactId';

@Injectable()
export class ExportContactToPdf {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
    @Inject('PDFGeneration')
    private readonly pdfGenerator: PDFGeneration,
  ) {}

  public async run(id: string): Promise<Buffer> {
    const contact = await this.contactRepository.findById(new ContactId(id));
    if (!contact) {
      throw new ContactNotFoundException(id);
    }

    const pdfConfig: PDFConfig = {
      title: {
        text: 'Contact Information',
      },
      table: {
        headers: {
          data: ['ID', 'Name', 'Email', 'Birth Date', 'Address'],
        },
        rows: {
          data: [
            contact.getId().toString(),
            `${contact.getFirstName().getValue()} ${contact.getLastName().getValue()}`,
            contact.getEmail().getValue(),
            contact.getBirthDate().getValue().toISOString().split('T')[0],
            `${contact.getLine1()}. ${contact.getLine2()}. ${contact.getCity()}. ${contact.getState()}. ${contact.getCountry()}`,
          ],
        },
        widths: [170, 75, 100, 55, 150],
      },
    };

    return this.pdfGenerator.generateTable(pdfConfig);
  }
}
