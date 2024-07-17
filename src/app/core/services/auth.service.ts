import { afterRender, Injectable } from '@angular/core';
import { User } from '../models/user.entities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimingService } from './timing.service';
import { environment } from '../../../environments/environment';
import { LogIn } from '../models/login.entities';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ApiMessage } from '../models/apimessage.entities';
import { Router } from '@angular/router';

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

  private userData?: User;
  
  urlBase: string;
  httpOptions: any;

  private isAuthenticated: boolean = false;
  private timeoutId: number | null | NodeJS.Timeout = null;

  public token: string | null = null;
  
  constructor(
    private http: HttpClient,
    private time: TimingService,
    private router: Router
  ) {
    this.urlBase = environment.API_URL + 'Usuarios/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true'
      }),
      responseType: 'json'
    };
    
    afterRender(() => {
      if(typeof sessionStorage !== 'undefined') {
        this.ownSessionStorage = sessionStorage;
      }
      this.isAuthenticated = sessionStorage.getItem('authenticated') ? true : false;
      this.token = sessionStorage.getItem('token');
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true',
        'Authorization': `Bearer ${this.token}`
      });

      this.loadUser();

      this.startTimeout();
    });
  }

  private authenticate(userObj: LogIn): Observable<any> {
    const apiUrl = this.urlBase;
    return this.http.post<ApiMessage>(apiUrl, userObj, this.httpOptions);
  }

  askForUser(): Observable<any> {
    const apiUrl = this.urlBase;
    return this.http.get<User>(apiUrl, this.httpOptions);
  }

  getUser(): User | undefined {
    if(this.userData !== null) {
      return this.userData;
    }
    this.loadUser();
    return this.userData;
  }

  getToken(): string | null {
    if(this.token !== null) {
      return this.token;
    }
    this.loadToken();
    return this.token;
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
  
  async login(userObj: LogIn): Promise<ApiMessage> {
    this.time.start();
    let response: ApiMessage;
    
    try {
      response = await firstValueFrom(this.authenticate(userObj));
      if(response.error) {
        this.clearTimeout();
      }
      else {
        this.ownSessionStorage?.setItem('token', response.mensaje);
        this.token = response.mensaje;
        this.httpOptions.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Max-Age': '86400',
          'x-cache': 'true',
          'Authorization': `Bearer ${this.token}`
        });
        this.ownSessionStorage?.setItem('authenticated', 'true');
        this.isAuthenticated = true;
        this.askForUser().subscribe((user: User) => {
          this.userData = user;
          this.ownSessionStorage?.setItem('user', JSON.stringify(user));
        });
        this.startTimeout();
      }
    }
    catch(error) {
      this.clearTimeout();
      response = {
        mensaje: 'Ocurrió un error durante el inicio de sesión.',
        error: true
      } as ApiMessage;
    }
    
    this.time.end();
    return response;
  }

  logout(): void {
    // Lógica para cerrar la sesión y establecer isAuthenticated en false
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    this.clearTimeout();
    this.ownSessionStorage?.removeItem('authenticated');
    this.ownSessionStorage?.removeItem('token');
    this.ownSessionStorage?.removeItem('user');
    this.ownSessionStorage?.removeItem('currentRoute');
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }

  private loadUser(): void {
    let userString: string | null;
    if(this.ownSessionStorage !== null) {
      userString = this.ownSessionStorage.getItem('user');
      if(userString !== null) {
        this.userData = JSON.parse(userString);
      }
    }
  }

  private loadToken(): void {
    if(this.ownSessionStorage !== null) {
      this.token = this.ownSessionStorage.getItem('token');
    }
  }
}
