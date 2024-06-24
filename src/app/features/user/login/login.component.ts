import { afterRender, Component, signal, WritableSignal } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { FormComponent } from './form/form.component';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.entities';
import { ApiMessage } from '../../../core/models/apimessage.entities';
import { LogIn } from '../../../core/models/login.entities';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BannerComponent,
    FormComponent,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  userData?: User;
  protected isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
     afterRender(() => {
      if(sessionStorage.getItem('authenticated') === 'true') {
        router.navigate(['sections']);
      }
     })
  }

  login(credentials: LogIn) {
    this.authService.login(credentials).then((res: ApiMessage) => {
      if(!res.error) {
        this.router.navigate(['sections']);
        this.userData = this.authService.userData;
      }
      else {
        if(typeof res.mensaje === 'string') {
          this.messageService.add({
            severity: 'error',
            summary: 'Inicio de sesión fallido',
            detail: res.mensaje
          });
        }
      }

      this.isLoading.set(false);
    });
  }
}