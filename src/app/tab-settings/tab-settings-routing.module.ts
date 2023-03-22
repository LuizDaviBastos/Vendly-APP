import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabSettingsPage } from './tab-settings.page';

const routes: Routes = [
  {
    path: '',
    component: TabSettingsPage,
  },
  {
    path: 'account',
    loadChildren: () => import('./account-settings/account-settings.module').then(x => x.AcountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
