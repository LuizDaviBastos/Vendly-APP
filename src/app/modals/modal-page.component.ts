import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TabSettingsPage } from '../tab-settings/tab-settings.page';

@Component({
    selector: 'modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss']
})
export class ModalPage {
    constructor(public modalController: ModalController) { }


    public async upload() {
        const modal = await this.modalController.create({
            
            component: TabSettingsPage,
            showBackdrop: true,
            initialBreakpoint: 0.5,
            breakpoints: [0, 0.25, 0.5],
            canDismiss: true,
            backdropDismiss: true
        })
        modal.present();
    }
}