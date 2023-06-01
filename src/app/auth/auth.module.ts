import { MeliService } from 'src/services/meli-service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPage } from './auth.page';
import { AuthPageRoutingModule } from './auth-routing.module';
import { SignupComponent } from './login/signup/signup.component';
import { Step1Component, Step2Component, Step3Component, Step4Component, Step5Component } from './login/signup/steps';
import { ShowHidePasswordModule } from '../components/show-hide-password/show-hide-password.module';
import { SecurityConfirmationModule } from '../tab-settings/security-confirmation/security-confirmation.module';
import { RecoveryPasswordComponent } from './login/recovery-password/recovery-password.component';
import { ConfirmRecoveryPasswordComponent } from './login/confirm-recovery-password/confirm-recovery-password.component';
import { IconModule } from 'src/components/icon-components/icon.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthPageRoutingModule,
    ShowHidePasswordModule,
    SecurityConfirmationModule,
    IconModule
  ],
  declarations: [
    AuthPage,
    SignupComponent, 
    Step1Component, 
    Step2Component, 
    Step3Component, 
    Step4Component, 
    Step5Component, 
    RecoveryPasswordComponent,
    ConfirmRecoveryPasswordComponent
  ],
  providers: [MeliService]
})
export class AuthPageModule { }
