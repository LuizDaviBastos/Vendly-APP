import { MeliService } from 'src/services/meli-service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabAccountPage } from './tab-account.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab-account-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [TabAccountPage],
  providers:[MeliService]
})
export class Tab2PageModule {}
