import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Country } from 'src/models/country.type';
import { SellerInfo as SellerInfo } from 'src/models/seller-info.model';
import { environment } from '../environments/environment';
import { Platform } from '@ionic/angular';
import { RequestResponse } from 'src/models/request-response.model';
import { LoginResponse } from 'src/models/login-response';
import { SellerMessage } from 'src/models/seller-message';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { isAuthenticatedResponse } from 'src/models/is-authenticated-response';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { Seller } from 'src/models/seller';
import Locals from 'ngx-editor/lib/Locals';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public apiHost: string = environment.urlBaseApi;

    constructor(private http: HttpClient, private platform: Platform) {
    }

    public login(email: string, password: string) {
        return this.http.post<RequestResponse<LoginResponse>>(`${this.apiHost}/api/auth/login`, {
            email: email,
            password: password
        });
    }

    public saveAccount(seller: Seller) {
        return this.http.post<RequestResponse<LoginResponse>>(`${this.apiHost}/api/auth/SaveAccount`, seller);
    }

    public sendEmailConfirmationCode(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<LoginResponse>>(`${this.apiHost}/api/auth/SendEmailConfirmation`, { params: params });
    }

    public confirmEmail(sellerId: string, code: string) {
        const params = new HttpParams().append('sellerId', sellerId).append('confirmationCode', code);
        return this.http.get<RequestResponse<LoginResponse>>(`${this.apiHost}/api/auth/ConfirmEmail`, { params: params });
    }

    /*public syncMeliAccount(countryId: string, token: string) {
        const params = new HttpParams().append('countryId', countryId).append('token', token);
        return this.http.get<RequestResponse<any>>(`${this.apiHost}/api/auth/SyncMeli`, { params: params });
    }*/

    public isAuthenticated(token: string) {
        const params = new HttpParams().append('token', token);
        return this.http.get<isAuthenticatedResponse>(`${this.apiHost}/api/auth/IsAuthenticated`, { params: params });
    }

    public addMeliAccount(signup: boolean = false, country: Country = 'br', browserTarget: string = "_system") {
        const options: InAppBrowserOptions = {
            zoom: "no",
            location: "no"
        };
        InAppBrowser.create(`${this.apiHost}/api/auth/SyncMeli?countryId=${country}&token=${LocalStorage.token}&signup=${signup}`, browserTarget, options);
    }

}
