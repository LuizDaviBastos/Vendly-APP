import { NgModule } from '@angular/core';
import { SubscriptionplanListComponent } from './subscriptionplan-list.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkeletonLoadingModule } from '../skeleton-loading/skeleton-loading.module';

@NgModule({
  declarations: [SubscriptionplanListComponent],
  exports: [SubscriptionplanListComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SkeletonLoadingModule
  ]
})
export class SubscriptionplanListModule { }
