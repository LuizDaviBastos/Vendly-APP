import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMessagePage } from './tab-message.page';
import { AuthGuardExpiredInvalidOfflineService } from '../auth-guard-services/auth-guard-expired.service';

const routes: Routes = [
  {
    path: '',
    component: TabMessagePage,
  },
  {
    canActivate: [AuthGuardExpiredInvalidOfflineService],
    path: 'edit/:id',
    loadChildren: () => import('./edit-message/edit-message.module').then(x => x.EditMessagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
