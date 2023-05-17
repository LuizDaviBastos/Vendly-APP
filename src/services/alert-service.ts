import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class AlertService {
    public async errorAlert(error: HttpErrorResponse ) {
        const message = `Error: ${error?.error?.message || 'Houve um erro ao processar a requisição.'}`;
        const toast = await this.toastController.create({
            message: message,
            duration: -1,
            position: 'bottom',
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