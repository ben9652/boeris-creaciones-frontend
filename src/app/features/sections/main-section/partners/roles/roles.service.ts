import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { BehaviorSubject, map, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { Partner, PartnerType } from '../../../../../core/models/partner.entities';
import { environment } from '../../../../../../environments/environment';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { PartnersService } from '../partners.service';
import { runInThisContext } from 'vm';

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

  // Observables de los roles asignados
  private assignedRolesSource: BehaviorSubject<PartnerType[]> = new BehaviorSubject<PartnerType[]>([]);
  private assignedRoles$: Observable<PartnerType[]> = this.assignedRolesSource.asObservable();

  // Observables de los roles no asignados al socio
  private nonAssignedRolesSource: BehaviorSubject<PartnerType[]> = new BehaviorSubject<PartnerType[]>([]);
  private nonAssignedRoles$: Observable<PartnerType[]> = this.nonAssignedRolesSource.asObservable();

  private partnerSubscription?: Subscription;
  private activePartner?: Partner;

  private getRolesFromApi(): Observable<PartnerType[]> {
    this.httpOptions = new HttpOptions(this.authService.getToken());
    return this.http.get<PartnerType[]>(this.urlBase, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private partnersService: PartnersService
  ) {
    this.urlBase = environment.API_URL + 'RolesSocios/';

    // Cada vez que se actualice el socio en `PartnersService` se actualizará en este servicio `activePartner`
    this.partnerSubscription = this.partnersService.partner.subscribe((partner: Partner) => {
      if(this.mappedRoles.size === 0) {
        // Obtengo de la API todos los roles y los agrego al mapa de roles
        this.getRolesFromApi().subscribe((roles: PartnerType[]) => {
          roles.forEach((role: PartnerType) => this.mappedRoles.set(role.id, role))
          this.partner = partner;
        });
      }
      else {
        this.partner = partner;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.partnerSubscription?.unsubscribe();
  }

  // Convierto el mapa de roles a un arreglo de roles
  get assignedRoles(): Observable<PartnerType[]> {
    return this.assignedRoles$;
  }

  get nonAssignedRoles(): Observable<PartnerType[]> {
    return this.nonAssignedRoles$;
  }

  get partner(): Partner | undefined {
    return this.activePartner;
  }
  
  // Actualizo el mapeo de los roles cuando se asigna un nuevo socio
  set partner(partner: Partner) {
    this.activePartner = partner;
    this.mappedNonAssignedRoles.clear();
    // console.log('Roles existentes mapeados: ', this.mappedRoles)
    this.mappedRoles.forEach((role: PartnerType) => {
      this.mappedNonAssignedRoles.set(role.id, role);
    });
    partner.partnerRoles.forEach((role: PartnerType) => {
      this.mappedNonAssignedRoles.delete(role.id);
    })
    this.assignedRolesSource.next(partner.partnerRoles);
    this.nonAssignedRolesSource.next(Array.from(this.mappedNonAssignedRoles.values()));
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
