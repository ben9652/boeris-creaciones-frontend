import { afterRender, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { FormComponent } from './form/form.component';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
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
  protected isLoading: WritableSignal<boolean> = signal(false);

  showForm: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {
     afterRender(() => {
      if(sessionStorage.getItem('authenticated')) {
        router.navigate(['sections']);
      }
      this.renderForm();
    })
  }

  renderForm(): void {
    this.showForm = true;

    this.cdRef.detectChanges();
  }

  login(credentials: LogIn) {
    this.authService.login(credentials).then((res: ApiMessage) => {
      if(!res.error) {
        this.router.navigate(['sections']);
      }
      else {
        this.messageService.add({
          severity: 'error',
          // TODO: Agregar al translate estos mensajes y hacer uso de ellos
          summary: 'Inicio de sesión fallido',
          detail: res.mensaje
        });
      }

      this.isLoading.set(false);
    });
  }
}
