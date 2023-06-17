import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RequestResponse } from '../models/request-response.model';
import { HttpClientBase } from './http-base.service';
import { PaymentLinkResponse } from 'src/models/payment-link-response';
import { SubscriptionInformation } from 'src/models/subscription-Information';
import { ExpiredResponse } from 'src/models/expired-response';
import { SubscriptionPlan } from 'src/models/subscription-plan';
import { PaymentHistory } from 'src/models/payment-history';
import { SellerMessage } from 'src/models/seller-message';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public messages: SellerMessage[] = [];

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

    public expiredStatus(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<ExpiredResponse>>(`api/account/expiredStatus`, { params: params });
    }

    public createFcmToken(sellerId: string, fcmToken: string) {
        const body = {
            sellerId: sellerId,
            fcmToken: fcmToken
        }
        return this.http.post<RequestResponse<any>>(`api/account/fcmToken`, body);
    }


    public createPaymentLink(sellerId: string, subscriptionPlanId: string, isBinary: boolean = false) {
        const params = new HttpParams().append('sellerId', sellerId).append('subscriptionPlanId', subscriptionPlanId).append('isBinary', isBinary);
        return this.http.get<RequestResponse<PaymentLinkResponse>>(`api/payment/createPaymentLink`, { params: params });
    }

    public getPaymentLink(historyId: string) {
        const params = new HttpParams().append('historyId', historyId);
        return this.http.get<RequestResponse<PaymentLinkResponse>>(`api/payment/getPaymentLink`, { params: params });
    }

    public getPaymentInformations(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<SubscriptionInformation>>(`api/account/getPaymentInformations`, { params: params });
    }

    public getSubscriptionPlans() {
        return this.http.get<RequestResponse<SubscriptionPlan[]>>(`api/payment/subscriptionList`);
    }

    public getPaymentHistory(sellerId: string, skip: number, take: number) {
        const params = new HttpParams().append('sellerId', sellerId).append('skip', skip).append('take', take);
        return this.http.get<RequestResponse<PaymentHistory[]>>(`api/payment/paymentHistory`, { params: params });
    }

}
