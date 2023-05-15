import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordSettingsPage } from './password-settings.page';
import { PasswordRoutingModule } from './password-settings-routing.module';
import { ShowHidePasswordModule } from '../../../components/show-hide-password/show-hide-password.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PasswordSettingsPage }]),
    PasswordRoutingModule,
    ShowHidePasswordModule
  ],
  declarations: [PasswordSettingsPage]
})
export class PasswordPageModule {}
