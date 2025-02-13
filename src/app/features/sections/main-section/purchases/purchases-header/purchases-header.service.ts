import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { FilterObject } from '../../../../../core/models/filterObj.entities';
import { Observable } from 'rxjs';
import { DataAccessService } from '../../../../../core/services/data-access/data-access.service';
import { SearchObject } from '../../../../../core/models/searchObj.entities';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PurchasesHeaderService implements OnInit {
  urlBase: string;
  httpOptions?: HttpOptions;

  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'Compras';
  }

  ngOnInit(): void {
    this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
  }

  getFilters(): Observable<FilterObject[]> {
    const apiUrl: string = `${this.urlBase}/filtros`;
    return this.http.get<FilterObject[]>(apiUrl, this.httpOptions);
  }

  getSearchFilters(): Observable<SearchObject[]> {
    const apiUrl: string = `${this.urlBase}/filtros-busqueda`;
    return this.http.get<SearchObject[]>(apiUrl, this.httpOptions);
  }

  getSortFilters(): Observable<TreeNode<string>[]> {
    return this.http.get<TreeNode<string>[]>(`${this.urlBase}/ordenamiento`, this.httpOptions);
  }
}
