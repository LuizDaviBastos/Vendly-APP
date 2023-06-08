import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscribeInfoComponent } from './subscribe-info.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SkeletonLoadingModule } from 'src/app/components/skeleton-loading/skeleton-loading.module';
import { SubscribeInfoRoutingModule } from './subscribe-info-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SkeletonLoadingModule,
    RouterModule.forChild([{ path: '', component: SubscribeInfoComponent }]),
    SubscribeInfoRoutingModule,
  ],
  declarations: [SubscribeInfoComponent, PaymentHistoryComponent],
  providers: [CurrencyPipe]
})
export class SubscribeInfoModule { }
