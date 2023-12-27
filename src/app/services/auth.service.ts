import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable, map } from 'rxjs';
import { Usuario, UsuarioLogin } from '../components/users/usuarios.entities';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase: string;
  httpOptions: any;

  private isAuthenticated = false;
  private timeoutId: number | null | NodeJS.Timeout = null;

  public userData: Usuario = new Usuario();

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {
    this.urlBase = env.apiUrlBase + 'Usuarios/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true'
      }),
      responseType: 'json'
    };
    this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true' ? true : false;
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}');
  }
  
  login(userObj: UsuarioLogin): Observable<boolean> {
    return this.authenticate(userObj).pipe(
      map(res => {
        if (res.error) {
          this.startTimeout();
          return false;
        }
        else {
          this.userData = new Usuario(
            res.mensaje.id_usuario,
            res.mensaje.username,
            res.mensaje.apellidos,
            res.mensaje.nombres,
            res.mensaje.email,
            res.mensaje.rol
          );
          this.isAuthenticated = true;
          this.resetTimeout();
          return true;
        }
      })
    )
  }

  logout(): void {
    // Lógica para cerrar la sesión y establecer isAuthenticated en false
    this.isAuthenticated = false;
    this.userData = new Usuario();
    this.router.navigate(['/login']);
    this.clearTimeout();
  }

  checkAuthentication(): boolean {
    // Devuelve el estado de isAuthenticated
    return this.isAuthenticated;
  }

  authenticate(userObj: UsuarioLogin): Observable<any> {
    const apiUrl = this.urlBase + 'Autenticar';
    return this.http.post<any>(apiUrl, userObj, this.httpOptions);
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
    sessionStorage.removeItem('user')
    sessionStorage.setItem('authenticated', 'false');
  }

  saveUserData(): void {
    sessionStorage.setItem('user', JSON.stringify(this.userData));
    sessionStorage.setItem('authenticated', 'true');
  }
}
