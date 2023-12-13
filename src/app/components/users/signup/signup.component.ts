import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  clases_error = 'ng-dirty ng-invalid';
  clases_no_error = 'ng-pristine ng-valid';

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  rol: string = '';

  cargandoRegistro: boolean = false;

  datos_no_llenados: boolean = false;

  register(event: any) {
    
  }
}
