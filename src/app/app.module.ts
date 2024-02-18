import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { HttpClientModule } from '@angular/common/http';

import { EnvServiceProvider } from './services/env.service.provider';

import { EllipsisModule } from 'ngx-ellipsis';

/********** Componentes de PrimeNG *************/

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';

/////////////////////////////////////////////////
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ForgotComponent } from './components/users/forgot/forgot.component';
import { ListRawMaterialsComponent } from './components/list-raw-materials/list-raw-materials.component';
import { CardRawMaterialComponent } from './components/list-raw-materials/card-raw-material/card-raw-material.component';
import { CustomDatePipe } from './components/shared/pipes/custom-date.pipe';
import { MathJaxParagraphComponent } from './components/shared/math-jax-paragraph/math-jax-paragraph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ForgotComponent,
    ListRawMaterialsComponent,
    CardRawMaterialComponent,
    CustomDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    TooltipModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    DividerModule,
    OverlayPanelModule,
    RadioButtonModule,
    EllipsisModule,
    MathJaxParagraphComponent
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
