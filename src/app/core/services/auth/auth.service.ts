import { afterRender, Injectable } from '@angular/core';
import { User } from '../../models/user.entities';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TimingService } from '../timing/timing.service';
import { environment } from '../../../../environments/environment';
import { LogIn } from '../../models/login.entities';
import { catchError, firstValueFrom, map, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiMessage } from '../../models/apimessage.entities';
import { Router } from '@angular/router';
import { DataAccessService } from '../data-access/data-access.service';
import { HttpOptions } from '../../models/httpOptions.entities';
import { ActiveRouteService } from '../active-route/active-route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ya que no se puede usar el objeto sessionStorage fuera del navegador,
  // me espero a que se inicialice todo para recién asignarle este objeto
  // a este atributo y así asegurarme de que se esté usando el objeto con
  // el navegador ya inicializado con todos los objetos propios de este
  // ya definidos.
  public ownSessionStorage: Storage | null = null;
  
  urlBase: string;
  httpOptions: HttpOptions;

  private timeoutId: number | null | NodeJS.Timeout = null;
  
  constructor(
    private http: HttpClient,
    private time: TimingService,
    private router: Router,
    private dataAccessService: DataAccessService,
    private activeRouteService: ActiveRouteService
  ) {
    this.urlBase = environment.API_URL + 'Usuarios/';
    this.httpOptions = new HttpOptions(null);
    
    afterRender(() => {
      if(typeof sessionStorage !== 'undefined') {
        this.ownSessionStorage = sessionStorage;
      }
      this.httpOptions = new HttpOptions(dataAccessService.getToken());

      this.startTimeout();
    });
  }

  private authenticate(userObj: LogIn): Observable<ApiMessage> {
    const apiUrl = this.urlBase;
    return this.http.post<ApiMessage>(apiUrl, userObj, this.httpOptions);
  }

  askForUser(): Observable<User> {
    const apiUrl = this.urlBase;
    return this.http.get<User>(apiUrl, this.httpOptions);
  }

  askForRoles(partner_id: number): Observable<string[]> {
    const apiUrl = environment.API_URL + 'RolesSocios/' + partner_id;
    return this.http.get<string[]>(apiUrl, this.httpOptions);
  }

  private startTimeout(): void {
    this.timeoutId = setTimeout(() => {
      this.logout(); // Cerrar la sesión automáticamente después de 15 minutos de inactividad.
    }, 15 * 60 * 1000); // 15 minutos en milisegundos
  }

  private resetTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.startTimeout();
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.ownSessionStorage?.removeItem('token');
    this.ownSessionStorage?.removeItem('authenticated');
  }
  
  login(userObj: LogIn): Observable<ApiMessage> {
    this.time.start();

    return this.authenticate(userObj).pipe(
      switchMap((response: ApiMessage) => {
        if(response.error) {
          this.clearTimeout();
          return throwError(() => response);
        }

        this.dataAccessService.setToken(response.mensaje);
        this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
        return this.askForUser();
      }),
      switchMap((user: User) => {
        this.dataAccessService.setUser(user);
        this.startTimeout();

        if(user.role === 's') {
          return this.askForRoles(user.id_user);
        }
        return of<string[]>([]);
      }),
      map((roles: string[]) => {
        const response: ApiMessage = {
          mensaje: 'Inicio de sesión exitoso',
          error: false
        };

        if(roles.length === 0) {
          this.time.end();
          return response;
        }

        this.dataAccessService.setRoles(roles);
        this.time.end();

        return response;
      })
    );
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.activeRouteService.setRoute('login');
    this.clearTimeout();
    this.dataAccessService.setRoles(null);
    this.dataAccessService.setUser(null);
    this.dataAccessService.setToken(null);
  }

  checkAuthentication(): boolean {
    return this.dataAccessService.getToken() ? true : false;
  }
}
