import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'fixedTwoDecimals'
})
export class FixedTwoDecimalsPipe implements PipeTransform {
    transform(value: number): string {
        const localeValue = value.toLocaleString("fr-FR");
        const [integer, decimal] = localeValue.split(",");
        if (decimal === undefined) {
            return `${integer},00`;
        } else if (decimal.length === 1) {
            return `${integer},${decimal}0`;
        } else {
            return `${integer},${decimal}`;
        }
    }
}