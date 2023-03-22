import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Country } from 'src/models/country.type';
import { SellerInfo as SellerInfo } from 'src/models/seller-info.model';
import { environment } from '../environments/environment';
import { CallBackLoginFunction } from 'src/models/call-back-login-function.yype';
import { Message } from 'src/models/message.mode';
import { Platform } from '@ionic/angular';

@Injectable()
export class MeliService {
  public baseUrl: string = environment.urlBaseApi;
  private finishedBrowserLogin: boolean = false;
  private accessToken: string;
  private accessTokenSuccess: boolean = false;
  private accessTokenError: boolean = false;
  private sellerInfo: SellerInfo = <SellerInfo>{
    success: false
  };

  constructor(private http: HttpClient, private platform: Platform) {}

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

  public async login(country: Country = 'br', callBackLogin: CallBackLoginFunction) {
    var authUrl = await this.getAuthUrl(country).toPromise();
    const options: InAppBrowserOptions = {
      zoom: "no",
    };

    let browser = InAppBrowser.create(authUrl.url, "_blank", options);

    if(window.navigator.platform == "Win32"){
      debugger;
      let url = prompt("setr callback url");
      await this.onGetCode(browser, <InAppBrowserEvent>{url: url}, callBackLogin);
      return;
    }
    browser.on("loadstart").subscribe(async (x) => {
      debugger;
      await this.onGetCode(browser, x, callBackLogin);
    });

    browser.on("loadstop").subscribe(async (x) => {
      debugger;
      await this.onGetCode(browser, x, callBackLogin);
    });

    browser.on("exit").subscribe((x) => {
      this.onGetCode(browser, x, callBackLogin);
      if (!this.finishedBrowserLogin) {
        callBackLogin({
          sellerInfo: this.sellerInfo,
          success: true
        });
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

  private async onGetCode(browser: InAppBrowserObject, url: InAppBrowserEvent, callBackLogin: CallBackLoginFunction) {
    debugger;
    let code = new URL(url?.url).searchParams.get("code");
    if (code) {
      if (this.finishedBrowserLogin == false) {
        this.finishedBrowserLogin = true;
        browser?.close();
        const accessToken = await this.getAccessToken(code).toPromise();
        if (accessToken) {
          this.accessToken = accessToken.access_token;
          this.sellerInfo.id = accessToken.user_id;
          this.sellerInfo = await this.onSuccessLogin();
          callBackLogin({
            sellerInfo: this.sellerInfo,
            success: this.sellerInfo.success,
            errorMessage: this.sellerInfo.message
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

  private async onSuccessLogin(): Promise<SellerInfo> {
    const sellerInfo = await this.getSellerInfo(this.sellerInfo.id).toPromise();
    if (sellerInfo.success) {
      return sellerInfo;
    }
    return this.sellerInfo;
  }
}
