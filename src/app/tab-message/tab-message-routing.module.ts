import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMessagePage } from './tab-message.page';

const routes: Routes = [
  {
    path: '',
    component: TabMessagePage,
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-message/edit-message.module').then(x => x.EditMessagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
