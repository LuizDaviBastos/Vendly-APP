import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Country } from 'src/models/country.type';
import { Platform } from '@ionic/angular';
import { RequestResponse } from 'src/models/request-response.model';
import { LoginResponse } from 'src/models/login-response';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { isAuthenticatedResponse } from 'src/models/is-authenticated-response';
import { Seller } from 'src/models/seller';
import { HttpClientBase } from './http-base.service';
import { SettingsService } from './settings-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
 
    constructor(private http: HttpClientBase, private platform: Platform, private settingsService: SettingsService) {
       
    }

    public login(email: string, password: string) {
        return this.http.post<RequestResponse<LoginResponse>>(`api/auth/login`, {
            email: email,
            password: password
        });
    }

    public saveAccount(seller: Seller) {
        return this.http.post<RequestResponse<LoginResponse>>(`api/auth/SaveAccount`, seller);
    }

    public sendEmailConfirmationCode(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<LoginResponse>>(`api/auth/SendEmailConfirmation`, { params: params });
    }

    public confirmEmail(sellerId: string, code: string) {
        const params = new HttpParams().append('sellerId', sellerId).append('confirmationCode', code);
        return this.http.get<RequestResponse<LoginResponse>>(`api/auth/ConfirmEmail`, { params: params });
    }

    public isAuthenticated(token: string) {
        const params = new HttpParams().append('token', token);
        return this.http.get<isAuthenticatedResponse>(`api/auth/IsAuthenticated`, { params: params });
    }

    public addMeliAccount(signup: boolean = false, country: Country = 'br', browserTarget: string = "_system") {
        this.settingsService.loadSettings().subscribe((settings) => {
            const options: InAppBrowserOptions = {
                zoom: "no",
                location: "no"
            };
            InAppBrowser.create(`${settings.urlBaseApi}/api/auth/SyncMeli?countryId=${country}&token=${LocalStorage.token}&signup=${signup}`, browserTarget, options);
        })
        
    }

}
