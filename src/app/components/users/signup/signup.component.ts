import { Component, HostListener } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
import { UsuarioRegistro } from '../usuarios.entities';

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

  constructor(
    public regService: SignupService,
    private router: Router,
    public envService: EnvService
  ) {

  }

  ngOnInit() {
    this.envService.checkDeviceType();
  }

  // Este método se ejecutará cada vez que se redimensione la ventana del navegador
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.envService.checkDeviceType();
  }

  register(event: any) {
    if((event.key === 'Enter' || event.pointerId) && !this.cargandoRegistro) {
      if(this.firstName !== '' && this.lastName !== '' && this.username !== '' && this.password !== '') {
        this.cargandoRegistro = true;
        this.regService.registerClient(
          new UsuarioRegistro(
            this.username,
            this.lastName,
            this.firstName,
            this.email,
            this.password
          )
        )
        .subscribe(res => {
          this.cargandoRegistro = false;
          console.log(res);
          this.router.navigate(['/login']);
        })
      }
      else {
        this.datos_no_llenados = true;
      }
    }
  }
}
