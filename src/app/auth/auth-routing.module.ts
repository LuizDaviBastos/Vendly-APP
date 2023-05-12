import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { SignupComponent } from './login/signup/signup.component';


const routes: Routes = [
  //scope (/auth)
  {
    
    path: '',
    component: AuthPage,
  },
  {
    path: 'signup',
    component: SignupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
