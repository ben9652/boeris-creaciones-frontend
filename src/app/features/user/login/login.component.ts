import { afterRender, Component, signal, WritableSignal } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { FormComponent } from './form/form.component';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ApiMessage } from '../../../core/models/apimessage.entities';
import { LogIn } from '../../../core/models/login.entities';

@Component({
    selector: 'app-login',
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

  selectedBackground: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.selectedBackground = this.setRandomBackground();
    
    afterRender(() => {
      if(sessionStorage.getItem('authenticated')) {
        router.navigate(['sections']);
      }
      this.renderForm();
    })
  }

  renderForm(): void {
    this.showForm = true;
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

  setRandomBackground(): string {
    let image_name: string = `flowers-`;
    // Genérame un número aleatorio entre 1 y 5
    const random_number: number = Math.floor(Math.random() * 6) + 1;
    // Concatena el número aleatorio con el nombre de la imagen
    image_name += `${random_number}.png`;

    return `url('pictures/${image_name}')`;
  }
}
