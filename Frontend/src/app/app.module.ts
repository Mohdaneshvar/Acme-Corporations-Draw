import { SafeHtmlPipe } from './shared/pipes/safeHtml.pipe';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Global } from './core/app-global';
import { BaseInterceptor } from './core/interceptor';
import { ROOT_REDUCER } from './core/store';
import { MultipleTranslateLoaderFactory } from './core/translate.module';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { TableModule } from 'primeng/table';
import { ParticipantsListComponent } from './pages/participants/participants-list/participants-list.component';
import { RegisterParticipantComponent } from './pages/participants/register/register-participant.component';
import { CreateSerialNumberComponent } from './pages/serial-numbers/create-serial-number.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    ParticipantsListComponent,
    RegisterParticipantComponent,
    CreateSerialNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule ,
    BotDetectCaptchaModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: MultipleTranslateLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,

    //    whitelistedDomains: ["localhost:5001"],
        //blacklistedRoutes: []
      }
    }),
    StoreModule.forRoot(ROOT_REDUCER, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),

    SharedModule
  ],
  providers: [
    MessageService,

    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    Global.Injector = injector;
  }
}
