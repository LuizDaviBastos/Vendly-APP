import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class AlertService {

    constructor(private toastController: ToastController) { }

    public async showToastAlert(message: string, duration: number = 5000, position: 'top' | 'bottom' | 'middle' = 'bottom') {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: position,
            keyboardClose: true,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                },
            ],
        });
        return toast.present();
    }
}