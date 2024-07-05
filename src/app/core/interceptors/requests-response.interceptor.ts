import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, throwError } from "rxjs";

function handleErrorResponse(error: HttpErrorResponse)  {
    return throwError(() => {
        return 'No estás autorizado a realizar esta acción';
    });
}

export const RequestResponseInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(catchError(handleErrorResponse));
}