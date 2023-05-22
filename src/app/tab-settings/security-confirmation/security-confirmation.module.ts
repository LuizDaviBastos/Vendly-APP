import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityConfirmationComponent } from './security-confirmation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [SecurityConfirmationComponent],
  exports: [SecurityConfirmationComponent]
})
export class SecurityConfirmationModule {}
