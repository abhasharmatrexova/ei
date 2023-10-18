import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';

// Import the environment
import { environment } from '../environments/environment';

// component
import { AppComponent } from './app.component';

// Page Route
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';

// Laguage
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ApiService } from './core/services/api.service';
import { GoogleMapsModule } from '@angular/google-maps';
// import { RoomTypesComponent } from './mongo-master/room-types/room-types.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ApiCacheInterceptor } from './core/services/api-cache.interceptor';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

function initializeKeycloak(keycloak: KeycloakService, realmName: string) {
  return () =>
    keycloak.init({
      config: {
        url: process.env['URL'],
        realm: process.env['REALM'] as string,
        clientId: process.env['CLIENT_ID'] as string
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/verificar-sso.html'
      }
     });
}


@NgModule({
  declarations: [
    AppComponent,
    // RoomTypesComponent,
  ],
  imports: [
    GoogleMapsModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),

  ],
  providers: [ ApiService,{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
    
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiCacheInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
