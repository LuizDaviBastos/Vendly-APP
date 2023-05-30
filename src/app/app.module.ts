import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, SearchTagsDirective],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule,
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
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
