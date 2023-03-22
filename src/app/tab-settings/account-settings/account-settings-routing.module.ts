import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsPage } from './account-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsPage,
  },
  {
    path: 'password',
    loadChildren: () => import('./password-settings/password-settings.module').then(x => x.PasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
