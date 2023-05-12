import { MeliService } from 'src/services/meli-service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthPage } from './auth.page';
import { AuthPageRoutingModule } from './auth-routing.module';
import { MeliLogoComponent } from 'src/components/meli-logo/meli-logo.component';
import { SignupComponent } from './login/signup/signup.component';
import { Step1Component, Step2Component } from './login/signup/steps';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthPageRoutingModule
  ],
  declarations:[AuthPage, MeliLogoComponent, SignupComponent, Step1Component, Step2Component],
  providers:[MeliService]
})
export class AuthPageModule {}
