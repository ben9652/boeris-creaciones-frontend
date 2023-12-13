import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { HttpClientModule } from '@angular/common/http';

import { EnvServiceProvider } from './services/env.service.provider';

/********** Componentes de PrimeNG *************/

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

/////////////////////////////////////////////////
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ForgotComponent } from './components/users/forgot/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    FormsModule
  ],
  providers: [
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    library: FaIconLibrary
  ) {
    library.addIconPacks(fas, far);
  }
}
