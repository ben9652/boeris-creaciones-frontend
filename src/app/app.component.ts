import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    const nums: string[] = ['A', 'U', 'A', 'U'];

    nums.sort((a,b) => {
      if(a === 'U') return 1;
      if(b === 'U') return -1;
      return 0;
    })
  }

  ngOnInit(): void {
    const isAuthenticated = this.authService.checkAuthentication();
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Si el usuario no está autenticado, redirigir a /login.
    }
  }
}
