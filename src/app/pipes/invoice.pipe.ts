import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoice.model';

@Pipe({
  name: 'invoice',
  standalone: true
})
export class InvoicePipe implements PipeTransform {

  transform(value: InvoiceModel[], search: string): InvoiceModel[] {
    if (!search) {
      return value;
    }

    return value.filter(p =>
      p.invoiceNumberFull.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.customer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

  }

}
