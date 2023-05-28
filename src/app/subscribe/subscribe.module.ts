import { NgModule } from '@angular/core';
import { SubscribeComponent } from './subscribe.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SubscribeComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubscribeComponent
      }
    ])
  ]
})
export class SubscribeModule { }

