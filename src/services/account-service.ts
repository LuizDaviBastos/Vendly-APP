import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RequestResponse } from '../models/request-response.model';
import { HttpClientBase } from './http-base.service';
import { PaymentLinkResponse } from 'src/models/payment-link-response';
import { SubscriptionInformation } from 'src/models/subscription-Information';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClientBase, private platform: Platform) {

    }

    public changePassword(sellerId: string, password: string, newPassword: string) {
        const body = {
            sellerId: sellerId,
            password: password,
            newPassword: newPassword
        }
        return this.http.post<RequestResponse<any>>(`api/settings/changePassword`, body);
    }

    public deleteAccount(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<any>>(`api/settings/deleteAccount`, { params: params });
    }

    public recoveryPassword(email: string) {
        const params = new HttpParams().append('email', email);
        return this.http.get<RequestResponse<any>>(`api/auth/RecoveryPassword`, { params: params });
    }

    public confirmRecoveryPassword(sellerId: string, code: string, newPassword: string) {
        const body = {
            sellerId: sellerId,
            code: code,
            newPassword: newPassword
        }
        return this.http.post<RequestResponse<any>>(`api/auth/confirmRecoveryPassword`, body);
    }

    public getPaymentLink(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<PaymentLinkResponse>>(`api/account/getPaymentLink`, { params: params });
    }

    public expiredStatus(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<boolean>>(`api/account/expiredStatus`, { params: params });
    }

    public createFcmToken(sellerId: string, fcmToken: string) {
        const body = {
            sellerId: sellerId,
            fcmToken: fcmToken
        }
        return this.http.post<RequestResponse<any>>(`api/account/fcmToken`, body);
    }
    
    public getPaymentInformations(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<SubscriptionInformation>>(`api/account/getPaymentInformations`, { params: params });
    }
    
}
