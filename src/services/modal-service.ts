import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubscribeComponent } from '../app/subscribe/subscribe.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modalController: ModalController) { }

    public async showSubscribeModal() {
        const modal = await this.modalController.create({
            component: SubscribeComponent,
            initialBreakpoint: 0.95,
            breakpoints: [0.1, 0.5, 0.75, 0.95, 1],
            canDismiss: true,
            backdropDismiss: true
          });
          modal.present();
    }
}
