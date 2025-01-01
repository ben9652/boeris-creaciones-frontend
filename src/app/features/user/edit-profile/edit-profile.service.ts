import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PatchObject } from '../../../core/models/patchObj.entities';
import { ApiMessage } from '../../../core/models/apimessage.entities';
import { User } from '../../../core/models/user.entities';
import { HttpOptions } from '../../../core/models/httpOptions.entities';
import { DataAccessService } from '../../../core/services/data-access/data-access.service';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  urlBase: string;
  httpOptions?: HttpOptions;

  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService,
    private storageService: StorageService
  ) {
    this.urlBase = environment.API_URL + 'Usuarios/';
    afterRender(() => {
      this.httpOptions = new HttpOptions(dataAccessService.getToken());
    });
  }

  checkPassword(id: number, password: string): Observable<boolean> {
    password.replace(' ', '+');
    const apiUrl: string = this.urlBase + 'ComprobarPassword?' + `id=${id}` + `&password=${password}`;
    return this.http.get<boolean>(apiUrl, this.httpOptions);
  }

  updateUser(id: number, attribsToChange: PatchObject[]): Observable<ApiMessage> {
    const apiUrl: string = this.urlBase + `${id}`;
    return this.http.patch<ApiMessage>(apiUrl, attribsToChange, this.httpOptions);
  }

  setUser(user: User) {
    this.storageService.setItem('user', JSON.stringify(user));
  }
}
