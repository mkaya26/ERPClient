import { Pipe, PipeTransform } from '@angular/core';
import { OrderModel } from '../models/order.model';

@Pipe({
  name: 'order',
  standalone: true
})
export class OrderPipe implements PipeTransform {

  transform(value: OrderModel[], search: string): OrderModel[] {
    if (!search) {
      return value;
    }

    return value.filter(p =>
      p.orderNumberFull.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.orderNumberYear.toLocaleString().includes(search) ||
      p.customer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

  }

}
