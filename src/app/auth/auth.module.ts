import { MeliService } from 'src/services/meli-service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPage } from './auth.page';
import { AuthPageRoutingModule } from './auth-routing.module';
import { MeliLogoComponent } from 'src/components/meli-logo/meli-logo.component';
import { SignupComponent } from './login/signup/signup.component';
import { Step1Component, Step2Component, Step3Component, Step4Component } from './login/signup/steps';
import { ShowHidePasswordModule } from '../components/show-hide-password/show-hide-password.module';
import { CodeInputModule } from 'angular-code-input';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthPageRoutingModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: true,
      code: 'abcdef'
    }),
  ],
  declarations:[AuthPage, MeliLogoComponent, SignupComponent, Step1Component, Step2Component, Step3Component, Step4Component],
  providers:[MeliService]
})
export class AuthPageModule {}
