import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { SignupComponent } from './login/signup/signup.component';
import { RecoveryPasswordComponent } from './login/recovery-password/recovery-password.component';
import { ConfirmRecoveryPasswordComponent } from './login/confirm-recovery-password/confirm-recovery-password.component';


const routes: Routes = [
  //scope (/auth)
  {
    
    path: '',
    component: AuthPage,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
  },
  {
    path: 'confirm-recovery-password',
    component: ConfirmRecoveryPasswordComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
