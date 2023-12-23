import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable, map } from 'rxjs';
import { Usuario } from '../components/users/usuarios.entities';
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
  
  login(username: string, password: string): Observable<boolean> {
    return this.authenticate(username, password).pipe(
      map(res => {
        if (res.error) {
          this.startTimeout();
          return false;
        }
        else {
          this.userData = new Usuario(
            res.id_usuario,
            res.username,
            res.apellidos,
            res.nombres,
            res.email,
            res.rol
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

  authenticate(username: string, password: string): Observable<any> {
    console.log(this.urlBase);
    const apiUrl = this.urlBase + 'AutenticarUsuario';
    const query = apiUrl + '?username=' + username + '&password=' + password;
    return this.http.get<any>(query, this.httpOptions);
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
