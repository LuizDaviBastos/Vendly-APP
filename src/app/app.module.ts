import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchTagsDirective } from './directives/search-tags.directive';
import { AuthInterceptor } from '../services/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IconModule } from 'src/components/icon-components/icon.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SubscribeModule } from './subscribe/subscribe.module';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent, SearchTagsDirective],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, IconModule, SubscribeModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDy9fSBYh58zt8TT4tzed3b9-HYeau-12w",
      authDomain: "asm-app-413c2.firebaseapp.com",
      databaseURL: "https://asm-app-413c2-default-rtdb.firebaseio.com",
      projectId: "asm-app-413c2",
      storageBucket: "asm-app-413c2.appspot.com",
      messagingSenderId: "1077536421024",
      appId: "1:1077536421024:web:cffcde3edeb38f937585c5"
    })),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // *************************************************
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
