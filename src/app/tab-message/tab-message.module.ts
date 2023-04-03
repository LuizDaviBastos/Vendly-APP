import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabMessagePage } from './tab-message.page';
import { Tab1PageRoutingModule } from './tab-message-routing.module';
import { MeliService } from '../../services/meli-service';
import { SellerAvatarComponent } from 'src/components/seller-avatar/seller-avatar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [TabMessagePage, SellerAvatarComponent],
  providers: [MeliService]
})
export class Tab1PageModule { }
