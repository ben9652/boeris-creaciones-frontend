import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { Branch } from '../../../../../core/models/branch.entities';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesListService {
  urlBase: string;
  httpOptions?: HttpOptions;

  branches: WritableSignal<Branch[] | null> = signal<Branch[] | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.urlBase = environment.API_URL + 'CatalogoSucursales';
  }

  addBranch(branch: Branch){
    this.branches()?.push(branch);
  }

  getBranchesFromDatabase(): Observable<Branch[]> {
    const branches: Branch[] | null = this.branches();
    if(!branches){
      this.httpOptions = new HttpOptions(this.authService.getToken());
      return this.http.get<Branch[]>(this.urlBase, this.httpOptions);
    } else {
      return of(branches);
    }
  }

  getBranch(id: number): Branch | undefined {
    if(this.branches.length !== 0){
      let branch: Branch | undefined = this.branches()?.find(branch => branch.id === id);
      if(branch){
        return branch;
      } else {
        return undefined;
      }
    }
    return undefined;
  }

  registerBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.urlBase, branch, this.httpOptions);
  }
}
