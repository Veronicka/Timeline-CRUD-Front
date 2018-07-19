import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common'; 
import localePt from '@angular/common/locales/pt'; registerLocaleData(localePt, 'pt');﻿

import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AutenticacaoService } from './login/autenticacao.service';
import { SettingsService } from './settings.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    },
    AuthService, 
    AutenticacaoService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
