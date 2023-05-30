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

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    constructor(private accountService: AccountService, private alertService: AlertService, private route: Router) { }

    public initialize() {
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                // Show some error
                //res://ic_launcher_round
            }
        });

        PushNotifications.addListener('registration',
            (token: Token) => {
                //alert('Push registration success, token: ' + token.value);
                const sellerId = LocalStorage.sellerId;
                this.accountService.createFcmToken(sellerId, token.value).subscribe(() => {
                    //console.log('token saved!');
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
                this.alertService.showNotification(notification.title, notification.body, 504);
                this.route.navigateByUrl('/message');
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                this.route.navigateByUrl('/message');
            }
        );
    }

    // public initialize() {
    //     this.fcm.subscribeToTopic('payment');

    //     this.fcm.getToken().then(token => {
    //         const sellerId = LocalStorage.sellerId;
    //         this.accountService.createFcmToken(sellerId, token).subscribe(() => {
    //             console.log('token saved!');
    //         });
    //     });

    //     this.fcm.onNotification().subscribe(data => {
    //         if (data.wasTapped) {
    //             console.log("Received in background");
    //             this.alertService.showToastAlert('Received in background');
    //         } else {
    //             console.log("Received in foreground");
    //             this.alertService.showToastAlert('Received in foreground');
    //         };
    //     });
    // }

}
