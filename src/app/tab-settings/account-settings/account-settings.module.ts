import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountSettingsPage } from './account-settings.page';
import { AccountRoutingModule } from './account-settings-routing.module';
import { SecurityConfirmationModule } from '../security-confirmation/security-confirmation.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AccountSettingsPage }]),
    AccountRoutingModule,
    SecurityConfirmationModule
  ],
  declarations: [AccountSettingsPage]
})
export class AcountPageModule {}
