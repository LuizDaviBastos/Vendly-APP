import { MeliService } from 'src/services/meli-service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthPage } from './auth.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AuthPageRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MeliLogoComponent } from 'src/components/meli-logo/meli-logo.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AuthPageRoutingModule,
    HttpClientModule
  ],
  declarations:[AuthPage, MeliLogoComponent],
  providers:[MeliService]
})
export class AuthPageModule {}
