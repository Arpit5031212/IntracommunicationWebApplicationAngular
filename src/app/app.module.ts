import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { GeneralModule } from './general/general.module';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderNavComponent } from './general/components/header-nav/header-nav.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    GeneralModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
