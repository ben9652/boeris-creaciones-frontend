import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { Usuario, UsuarioLogin } from '../usuarios.entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: Usuario = new Usuario();
  
  username: string = '';
  password: string = '';
  cargandoLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public envService: EnvService
  ) {
    
  }

  ngOnInit(): void {
    this.envService.checkDeviceType();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.setItem('authenticated', 'false');
  }
  
  login(event: any) {
    if((event.key === 'Enter' || event.pointerId) && !this.cargandoLogin) {
      this.cargandoLogin = true;
      this.authService.login(
        new UsuarioLogin(this.username, this.password)
      )
      .subscribe(isAuthenticated => {
        this.cargandoLogin = false;
        if(isAuthenticated) {
          this.router.navigate(['home']);
          this.userData = this.authService.userData;
          sessionStorage.setItem('user', JSON.stringify(this.userData));
          sessionStorage.setItem('authenticated', 'true');
        }
        else {
          console.log('Inicio de sesión fallido');
        }
      });
    }
  }

  register(event: any) {
    this.router.navigate(['/signup']);
  }

  forgotPassword(event: any) {

  }
}
