import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { SignupComponent } from './login/signup/signup.component';
import { RecoveryPasswordComponent } from './login/recovery-password/recovery-password.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
