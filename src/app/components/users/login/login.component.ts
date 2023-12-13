import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  cargandoLogin: boolean = false;

  constructor(
    private router: Router
  ) {
  }
  
  login(event: any) {
    console.log("Se apretó botón de iniciar sesión")
  }

  register(event: any) {
    this.router.navigate(['/signup']);
  }

  forgotPassword(event: any) {

  }
}
