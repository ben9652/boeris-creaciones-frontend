import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(string_date: string | undefined, ...args: unknown[]): string {
    if(!string_date)
      return 'ERROR: no date';
    
    const date: Date = new Date(string_date);
    if(!date)
      return 'ERROR: invalid date';
    
    const year = string_date?.substring(0,4);
    const month = string_date?.substring(5,7);
    const day = string_date?.substring(8,10);

    return day + '/' + month + '/' + year;
  }

}
