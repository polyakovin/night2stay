import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rubles'
})
export class RublesPipe implements PipeTransform {

  transform(val): any {
    if (val !== undefined && val !== null) {
      return val.toLocaleString(3);// + ' RUB';
    }

    return '';
  }

}
