import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { BehaviorSubject, catchError, map, Observable, of, Subject, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Partner, PartnerType } from '../../../../../core/models/partner.entities';
import { environment } from '../../../../../../environments/environment';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { PartnersService } from '../partners.service';
import { runInThisContext } from 'vm';
import { DataAccessService } from '../../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  urlBase: string;
  httpOptions?: HttpOptions;

  // Mapa de los roles no asignados
  private mappedNonAssignedRoles: Map<number, PartnerType> = new Map<number, PartnerType>();

  // Mapa de roles
  private mappedRoles: Map<number, PartnerType> = new Map<number, PartnerType>();

  // Signal de los roles asignados
  private _assignedRoles: WritableSignal<PartnerType[]> = signal([]);

  // Signal de los roles no asignados al socio
  private _nonAssignedRoles: WritableSignal<PartnerType[]> = signal([]);
  
  private activePartner?: Partner;

  private getRolesFromApi(): Observable<PartnerType[]> {
    this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    return this.http.get<PartnerType[]>(this.urlBase, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService,
    private partnersService: PartnersService
  ) {
    this.urlBase = environment.API_URL + 'RolesSocios/';
    
    // Cada vez que se actualice el socio en `PartnersService` se actualizará en este servicio `activePartner`
    effect(() => {
      if (partnersService.partner) {
        if(this.mappedRoles.size === 0) {
          // Obtengo de la API todos los roles y los agrego al mapa de roles
          this.getRolesFromApi().subscribe((roles: PartnerType[]) => {
            roles.forEach((role: PartnerType) => this.mappedRoles.set(role.id, role))
            this.partner = partnersService.partner;
          });
        }
        else {
          this.partner = partnersService.partner;
        }
      }
    }, { allowSignalWrites: true })
  }

  // Convierto el mapa de roles a un arreglo de roles
  get assignedRoles(): PartnerType[] {
    return this._assignedRoles();
  }

  get nonAssignedRoles(): PartnerType[] {
    return this._nonAssignedRoles();
  }

  get partner(): Partner | undefined {
    return this.activePartner;
  }
  
  // Actualizo el mapeo de los roles cuando se asigna un nuevo socio
  set partner(partner: Partner) {
    this.activePartner = partner;
    this.mappedNonAssignedRoles.clear();
    
    this.mappedRoles.forEach((role: PartnerType) => {
      this.mappedNonAssignedRoles.set(role.id, role);
    });
    partner.partnerRoles.forEach((role: PartnerType) => {
      this.mappedNonAssignedRoles.delete(role.id);
    })
    this._assignedRoles.set(partner.partnerRoles);
    this._nonAssignedRoles.set(Array.from(this.mappedNonAssignedRoles.values()));
  }

  assignRolesToPartner(roles: PartnerType[]): Observable<void> {
    const apiUrl: string = this.urlBase + this.partner?.id_user;

    let rolesIds: number[] = [];
    roles.forEach((role: PartnerType) => {
      rolesIds.push(role.id);
    })

    return this.http.put<void>(apiUrl, rolesIds, this.httpOptions);
  }
}
