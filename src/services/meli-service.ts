import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Country } from 'src/models/country.type';
import { SellerInfo as SellerInfo } from 'src/models/seller-info.model';
import { environment } from '../environments/environment';
import { CallBackLoginFunction } from 'src/models/call-back-login-function.yype';
import { Message } from 'src/models/message.mode';
import { Platform } from '@ionic/angular';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Injectable()
export class MeliService {
  public baseUrl: string = environment.urlBaseApi;
  private sellerInfo: SellerInfo = <SellerInfo>{
    success: false
  };

  constructor(private http: HttpClient, private platform: Platform) {
  }

  public getAuthUrl(countryId: string) {
    const httpParams = new HttpParams().set('countryId', countryId);
    return this.http.get<any>(`${this.baseUrl}/api/auth/GetAuthUrl`, { params: httpParams });
  }

  public getAccessToken(code: string) {
    const httpParams = new HttpParams().set('code', code);
    return this.http.get<any>(`${this.baseUrl}/api/auth/GetAccessToken`, { params: httpParams });
  }

  public getSellerInfo(sellerId: number) {
    const httpParams = new HttpParams().set('sellerId', sellerId);
    return this.http.get<SellerInfo>(`${this.baseUrl}/api/auth/GetSellerInfoBySellerId`, { params: httpParams });
  }

  public async login(country: Country = 'br', callBackLogin: CallBackLoginFunction, target: string = "_system") {
    var authUrl = await this.getAuthUrl(country).toPromise();
    const options: InAppBrowserOptions = {
      zoom: "no",
      location: "no",
    };

    let browser = InAppBrowser.create(authUrl.url, target, options);
    if (window.navigator.platform == "Win32") {
      const url = prompt("set callback url");
      await this.onGetCode(browser, url, callBackLogin);
      return;
    }

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      debugger;
      const code = new URL(new URL(event.url).searchParams.get("url")).searchParams.get("code");
      if (code) {
        this.onGetCode(browser, code, callBackLogin);
      }
    });
  }

  public async getMessageAsync(sellerId: number) {
    const params = new HttpParams().append('sellerId', sellerId);
    return await this.http.get<Message>(`${this.baseUrl}/api/Message/Get`, { params: params }).toPromise();
  }

  public async saveMessageAsync(sellerId: number, message: string) {
    return await this.http.post(`${this.baseUrl}/api/Message/Update`, {
      sellerId: sellerId,
      message: message
    }).toPromise();
  }

  public async onGetCode(browser: InAppBrowserObject, code: string, callBackLogin: CallBackLoginFunction) {
    if (code) {
      browser?.close();
      const accessToken = await this.getAccessToken(code).toPromise();
      if (accessToken) {
        this.getSellerInfo(accessToken.user_id).subscribe((result) => {
          this.sellerInfo = result;
          callBackLogin({
            sellerInfo: this.sellerInfo,
            success: this.sellerInfo.success,
            errorMessage: this.sellerInfo.message
          });
        });
      }
      else {
        callBackLogin({
          sellerInfo: this.sellerInfo,
          success: false,
          errorMessage: `access-token nullo | accessToken: ${accessToken?.access_token}`
        });
      }
    }
  }
}
