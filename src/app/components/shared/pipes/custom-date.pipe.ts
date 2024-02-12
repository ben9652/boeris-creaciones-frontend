import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: Date | undefined, ...args: unknown[]): string {
    if(!date)
      return 'ERROR: invalid date';
    
    const string_date = date.toISOString().substring(0,10);
    const year = string_date.substring(0,4);
    const month = string_date.substring(5,7);
    const day = string_date.substring(8,10);

    return day + '/' + month + '/' + year;
  }

}
