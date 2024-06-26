import { afterRender, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MainBannerComponent } from '../../sections/main-section/main-banner/main-banner.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { EditProfileService } from './edit-profile.service';
import { User } from '../../../core/models/user.entities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PatchObject } from '../../../core/models/patchObj.entities';
import { ApiMessage } from '../../../core/models/apimessage.entities';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    TranslateModule,
    MainBannerComponent,
    ToastModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  providers: [MessageService]
})
export class EditProfileComponent {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmedPassword?: string;

  userData: User | null = null;

  constructor(
    public translateService: TranslateService,
    private authService: AuthService,
    private editProfileService: EditProfileService,
    private messageService: MessageService
  ) {
    afterRender(() => {
      this.userData = authService.getUser();
    })
  }

  private updateUsername() {
    
  }

  private update() {

  }

  updateChanges() {
    let attributesToChange: PatchObject[] = [];
    if(this.username) {
      attributesToChange.push(
        new PatchObject('replace', 'username', this.username)
      );
    }
    if(this.currentPassword && this.newPassword && this.confirmedPassword) {
      if(this.newPassword !== this.confirmedPassword) {
        this.messageService.add({
          severity: 'warn',
          // TODO: Agregar al translate estos mensajes y hacer uso de ellos
          summary: 'Campos inválidos',
          detail: 'Las contraseñas no coinciden'
        });
        return;
      }
      else {
        attributesToChange.push(
          new PatchObject('replace', 'password', this.newPassword)
        );
      }
    }

    if(!this.username && !this.currentPassword && !this.newPassword && !this.confirmedPassword) {
      this.messageService.add({
        severity: 'warn',
        // TODO: Agregar al translate estos mensajes y hacer uso de ellos
        summary: 'Campos inválidos',
        detail: 'No se llenaron los campos'
      });
      return;
    }
    else {
      if(this.userData !== null) {
        if(this.currentPassword && this.newPassword) {
          this.editProfileService.checkPassword(this.userData.id_user, this.currentPassword).subscribe((isActualPassword: boolean) => {
            if(!isActualPassword) {
              this.messageService.add({
                severity: 'error',
                // TODO: Agregar al translate estos mensajes y hacer uso de ellos
                summary: 'Campos inválidos',
                detail: 'Contraseña incorrecta'
              });
            }
            else {
              if(this.userData !== null) {
                this.editProfileService.updateUser(this.userData.id_user, attributesToChange).subscribe((res: ApiMessage) => {
                  this.messageService.add({
                    severity: 'success',
                    // TODO: Agregar al translate estos mensajes y hacer uso de ellos
                    summary: 'Éxito',
                    detail: res.mensaje
                  });
                });
              }
            }
          });
        }
        else if(this.username) {
          if(this.userData !== null) {
            this.editProfileService.updateUser(this.userData.id_user, attributesToChange).subscribe((res: ApiMessage) => {
              this.messageService.add({
                severity: 'success',
                // TODO: Agregar al translate estos mensajes y hacer uso de ellos
                summary: 'Éxito',
                detail: res.mensaje
              });
            });
          }
        }
        else if(this.username && this.currentPassword && this.newPassword) {
          this.editProfileService.checkPassword(this.userData.id_user, this.currentPassword).subscribe((isActualPassword: boolean) => {
            if(!isActualPassword) {
              this.messageService.add({
                severity: 'error',
                // TODO: Agregar al translate estos mensajes y hacer uso de ellos
                summary: 'Campos inválidos',
                detail: 'Contraseña incorrecta'
              });
            }
            else {
              if(this.userData !== null) {
                this.editProfileService.updateUser(this.userData.id_user, attributesToChange).subscribe((res: ApiMessage) => {
                  this.messageService.add({
                    severity: 'success',
                    // TODO: Agregar al translate estos mensajes y hacer uso de ellos
                    summary: 'Éxito',
                    detail: res.mensaje
                  });
                });
              }
            }
          });
        }
      }
    }
  }
}
