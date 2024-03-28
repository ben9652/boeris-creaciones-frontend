import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { Usuario, UsuarioLogin } from '../usuarios.entities';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  userData: Usuario = new Usuario();
  
  username: string = '';
  password: string = '';
  cargandoLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public envService: EnvService,
    private messageService: MessageService
  ) {
    
  }

  ngOnInit(): void {
    this.envService.checkDeviceType();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.setItem('authenticated', 'false');
  }
  
  login(event: any) {
    if(this.username.length !== 0 && this.password.length !== 0) {
      if((event.key === 'Enter' || event.pointerId) && !this.cargandoLogin) {
        this.cargandoLogin = true;
        this.authService.login(
          new UsuarioLogin(this.username, this.password)
        )
        .subscribe(res => {
          const isAuthenticated = !res.error;
          this.cargandoLogin = false;
          if(isAuthenticated) {
            this.router.navigate(['home']);
            this.userData = this.authService.userData;
            sessionStorage.setItem('user', JSON.stringify(this.userData));
            sessionStorage.setItem('authenticated', 'true');
          }
          else {
            this.messageService.add({
              severity: 'error',
              summary: 'Inicio de sesión fallido',
              detail: res.mensaje
            })
          }
        });
      }
    }
  }

  register(event: any) {
    this.router.navigate(['/signup']);
  }

  forgotPassword(event: any) {

  }
}
