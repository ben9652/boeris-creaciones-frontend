import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-menu',
    imports: [
        ButtonModule,
        TranslateModule,
        CommonModule
    ],
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  constructor(
    public translateService: TranslateService,
    public authService: AuthService,
    private router: Router
  ) {
    
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }
}
