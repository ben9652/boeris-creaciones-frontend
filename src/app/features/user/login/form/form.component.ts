import { Component, model, ModelSignal, OutputEmitterRef, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LogIn } from '../../../../core/models/login.entities';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgClass
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  username?: string;
  password?: string;

  loginLoading: ModelSignal<boolean> = model(false);

  enterClicked: OutputEmitterRef<LogIn> = output<LogIn>({});

  eventObj: any;

  constructor(
    public translateService: TranslateService
  ) {

  }

  private emitToLogin(): void {
    this.loginLoading.set(true);
    let credentials: LogIn = new LogIn(this.username, this.password);
    this.enterClicked.emit(credentials);
  }

  onButtonClick() {
    if(this.username && this.password && !this.loginLoading()) {
      this.emitToLogin();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.username && this.password && !this.loginLoading()) {
      this.emitToLogin();
    }
  }
}
