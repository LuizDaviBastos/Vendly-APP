import { NgModule } from '@angular/core';
import { FreePeriodComponent } from './free-period.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from 'src/components/icon-components/icon.module';
import { SkeletonLoadingModule } from '../../components/skeleton-loading/skeleton-loading.module';
import { SubscriptionplanListModule } from 'src/app/components/subscriptionplan-list/subscriptionplan-list.module';

@NgModule({
  declarations: [FreePeriodComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IconModule,
    SkeletonLoadingModule,
    SubscriptionplanListModule,
    RouterModule.forChild([
      {
        path: '',
        component: FreePeriodComponent
      }
    ])
  ]
})
export class FreePeriodModule { }

