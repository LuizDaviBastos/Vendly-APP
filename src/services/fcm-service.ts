import { Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { AlertService } from './alert-service';

import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { Uteis } from 'src/app/helpers/Uteis';

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    constructor(private accountService: AccountService, private alertService: AlertService, private route: Router) { }

    public initialize() {
        if (window.navigator.platform == "Win32") {
            return;
        }
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                // Show some error
                //res://ic_launcher_roundGetSellerInfo
            }
        });

        PushNotifications.addListener('registration',
            (token: Token) => {
                //alert('Push registration success, token: ' + token.value);
                const sellerId = LocalStorage.sellerId;
                this.accountService.createFcmToken(sellerId, token.value).subscribe(() => {
                });
            }
        );

        PushNotifications.addListener('registrationError',
            (error: any) => {
                //alert('Error on registration: ' + JSON.stringify(error));
            }
        );


        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                let id = Uteis.getRandomNumber(0, 500);
                if(notification.data?.id) {
                    id = notification.data.id;
                }
                this.alertService.showNotification(notification.title, notification.body, id);
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                this.route.navigateByUrl('/settings/subscribe-info');
            }
        );
    }

}
