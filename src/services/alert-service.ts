import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { LocalNotifications, Schedule } from '@capacitor/local-notifications';

@Injectable({ providedIn: 'root' })
export class AlertService {
    public async errorAlert(error: HttpErrorResponse) {
        const message = `${error?.error?.message || 'Houve um erro ao processar a requisição.'}`;
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

    public async showNotification(title: string, message: string, id: number) {
        await LocalNotifications.schedule({
            notifications: [{
                id: id,
                title: title,
                body: message
            }]
        })

        await LocalNotifications.schedule({
            notifications: [{
                id: id + 1,
                title: title,
                body: message
            }]
        })
    }
}