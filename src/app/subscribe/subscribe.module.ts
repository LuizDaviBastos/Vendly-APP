import { NgModule } from '@angular/core';
import { SubscribeComponent } from './subscribe.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from 'src/components/icon-components/icon.module';
import { SkeletonLoadingModule } from '../components/skeleton-loading/skeleton-loading.module';

@NgModule({
  declarations: [SubscribeComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IconModule,
    SkeletonLoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubscribeComponent
      }
    ])
  ]
})
export class SubscribeModule { }

