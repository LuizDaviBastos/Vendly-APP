import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSettingsPage } from './tab-settings.page';
import { Tab3PageRoutingModule } from './tab-settings-routing.module';
import { SubscribeInfoComponent } from './subscribe/subscribe-info.component';
import { SkeletonLoadingModule } from '../components/skeleton-loading/skeleton-loading.module';
import { ContactModalComponent } from '../modals/contact-modal/contact-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SkeletonLoadingModule,
    RouterModule.forChild([{ path: '', component: TabSettingsPage }]),
    Tab3PageRoutingModule,
  ],
  declarations: [TabSettingsPage, SubscribeInfoComponent, ContactModalComponent],
  providers: [CurrencyPipe]
})
export class Tab3PageModule { }
