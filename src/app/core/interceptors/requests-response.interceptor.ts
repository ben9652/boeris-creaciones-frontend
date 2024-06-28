import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, throwError } from "rxjs";

function handleErrorResponse(error: HttpErrorResponse)  {
    // const messageService = inject(MessageService);
    // if(error.status === 403) {
    //     messageService.add({
    //         severity: 'error',
    //         // TODO: Agregar al translate estos mensajes y hacer uso de ellos
    //         summary: 'Denegado',
    //         detail: 'No estás autorizado para realizar esta acción'
    //     });
    // }
    // const errorResponse = `Error`
    return throwError(() => {
        switch(error.status) {
            case 403:
                return 'No estás autorizado a realizar esta acción';
            default:
                return 'Error en la consulta';
        }
    });
}

export const RequestResponseInterceptor: HttpInterceptorFn = (req, next) => 
    next(req).pipe(catchError(handleErrorResponse));