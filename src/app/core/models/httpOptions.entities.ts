import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export class HttpOptions {
    headers?: HttpHeaders;
    responseType?: any;

    constructor(token: string | null, isMultimedia?: boolean) {
        if(isMultimedia) {
            if(token) {
                this.headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                });
            }
            else {
                this.headers = new HttpHeaders({
                });
            }
        }
        else {
            if(token) {
                this.headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Max-Age': '86400',
                    'x-cache': 'true',
                    'Authorization': `Bearer ${token}`
                });
            }
            else {
                this.headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Max-Age': '86400',
                    'x-cache': 'true'
                });
            }
        }

        if(isMultimedia) {
            this.responseType = 'text';
        }
        else {
            this.responseType = 'json';
        }
    }
}