import { Component } from '@angular/core';
import { Inject } from '@angular/core';

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
  ) {
  }
  
  login(event: any) {
    console.log("Se apretó botón de iniciar sesión")
  }
}
