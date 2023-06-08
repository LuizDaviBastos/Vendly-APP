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
  },
  {
    path: 'subscribe-info',
    loadChildren: () => import('./subscribe/subscribe-info.module').then(x => x.SubscribeInfoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
