import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpOptions } from '../../core/models/httpOptions.entities';
import { environment } from '../../../environments/environment';
import { Category } from '../../core/models/category.entities';
import { PatchObject } from '../../core/models/patchObj.entities';
import { DataAccessService } from '../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {
  urlBase: string;
  httpOptions?: HttpOptions;

  constructor(
    public translateService: TranslateService,
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'RubrosMateriasPrimas';
    this.httpOptions = new HttpOptions(dataAccessService.getToken());
  }

  getCategories(): Observable<Category[]> {
    this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    const apiUrl: string = this.urlBase;
    return this.http.get<Category[]>(apiUrl, this.httpOptions);
  }

  create(newCategory: Category): Observable<Category> {
    const apiUrl: string = this.urlBase;
    return this.http.post<Category>(apiUrl, newCategory, this.httpOptions);
  }

  edit(categoryId: number, newCategoryName: string): Observable<Category> {
    const apiUrl: string = this.urlBase + `/${categoryId}`;
    const patchObj: PatchObject[] = [
      new PatchObject('replace', 'name', newCategoryName)
    ];

    return this.http.patch<Category>(apiUrl, patchObj, this.httpOptions);
  }
}
