import { afterRender, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { FormComponent } from './form/form.component';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models/user.entities';
import { ApiMessage } from '../../../core/models/apimessage.entities';
import { LogIn } from '../../../core/models/login.entities';
import { DataAccessService } from '../../../core/services/data-access/data-access.service';

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
    private cdRef: ChangeDetectorRef,
    private dataAccessService: DataAccessService,
    private activatedRoute: ActivatedRoute
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
    this.authService.login(credentials).subscribe({
      next: (res: ApiMessage) => {
        this.router.navigate(['sections']);
      },
      error: (err: ApiMessage) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Inicio de sesión fallido',
          detail: err.mensaje
        });
        
        this.isLoading.set(false);
      }
    });
  }
}
