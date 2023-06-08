import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Country } from 'src/models/country.type';
import { SellerInfo as SellerInfo } from 'src/models/seller-info.model';
import { Platform } from '@ionic/angular';
import { RequestResponse } from 'src/models/request-response.model';
import { LoginResponse } from 'src/models/login-response';
import { SellerMessage } from 'src/models/seller-message';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { isAuthenticatedResponse } from 'src/models/is-authenticated-response';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { Seller } from 'src/models/seller';
import { HttpClientBase } from './http-base.service';
import { SubscriptionPlan } from 'src/models/subscription-plan';

@Injectable({
  providedIn: 'root'
})
export class MeliService  {

  constructor(private http: HttpClientBase, private platform: Platform) {
  }

  public login(email: string, password: string) {
    return this.http.post<RequestResponse<LoginResponse>>(`api/auth/login`, {
      email: email,
      password: password
    });
  }

  public getMeliAccountInfo(meliSellerId: number) {
    const httpParams = new HttpParams().set('meliSellerId', meliSellerId);
    return this.http.get<RequestResponse<SellerInfo>>(`api/account/GetMeliSellerInfo`, { params: httpParams });
  }

  public addMeliAccount(country: Country = 'br', browserTarget: string = "_system") {
    const options: InAppBrowserOptions = {
      zoom: "no",
      location: "no"
    };
    InAppBrowser.create(`api/auth/SyncMeli?countryId=${country}&token=${LocalStorage.token}`, browserTarget, options);
  }

  public saveMessage(message: SellerMessage) {
    return this.http.post<RequestResponse<SellerMessage>>(`api/Message/Update`, message);
  }

  public isAuthenticated(token: string) {
    const params = new HttpParams().append('token', token);
    return this.http.get<isAuthenticatedResponse>(`api/auth/IsAuthenticated`, { params: params });
  }

  public hasMeliAccount(sellerId: string) {
    const params = new HttpParams().append('sellerId', sellerId);
    return this.http.get<boolean>(`api/account/hasMeliAccount`, { params: params });
  }

  public getSellerInfo(sellerId: string) {
    const params = new HttpParams().append('sellerId', sellerId);
    return this.http.get<RequestResponse<Seller>>(`api/account/GetSellerInfo`, { params: params });
  }

  public getMessage(meliAccountId: string, messageType: MessageTypeEnum) {
    const params = new HttpParams().set('meliAccountId', meliAccountId).append('messageType', messageType);
    return this.http.get<RequestResponse<SellerMessage>>(`api/message/get`, { params: params });
  }

}
