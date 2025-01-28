import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'receptionModeParse'
})
export class ReceptionModeParsePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'B':
                return 'Retiro en domicilio de proveedor';
            case 'E':
                return 'Entrega a domicilio';
            default:
                return 'Desconocido';
        }
    }
}

@Pipe({
    name: 'paymentMethodParse'
})
export class PaymentMethodParsePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'T':
                return 'Transferencia';
            case 'E':
                return 'Efectivo';
            default:
                return 'Desconocido';
        }
    }
}