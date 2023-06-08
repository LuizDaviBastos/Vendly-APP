import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubscribeComponent } from '../app/modals/subscribe/subscribe.component';
import { FreePeriodComponent } from 'src/app/modals/free-period/free-period.component';
import { ContactModalComponent } from 'src/app/modals/contact-modal/contact-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modalController: ModalController) { }

    public async showSubscribeModal(title?: string, description?: string) {
        const modal = await this.modalController.create({
            component: SubscribeComponent,
            initialBreakpoint: 0.95,
            breakpoints: [0.1, 0.5, 0.75, 0.95, 1],
            componentProps: {
                title: title,
                description: description
            },
            canDismiss: true,
            backdropDismiss: true
        });
        modal.present();
        return modal;
    }

    public async showFreePeriodModal() {
        const modal = await this.modalController.create({
            component: FreePeriodComponent,
            initialBreakpoint: 1,
            breakpoints: [0, 0.5, 0.75, 0.95, 1],
            canDismiss: true,
            backdropDismiss: true
        });
        modal.present();
        return modal;
    }

    public async showContactModal() {
        const modal = await this.modalController.create({
            component: ContactModalComponent,
            initialBreakpoint: 0.5,
            breakpoints: [0, 0.5, 0.75],
            canDismiss: true,
            backdropDismiss: true
        });
        modal.present();
        return modal;
    }
}
