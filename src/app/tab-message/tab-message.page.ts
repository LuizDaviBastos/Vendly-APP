import { LocalStorage as LocalStorage } from '../helpers/local-storage.helper';
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeyValue } from '@angular/common';
import { Seller } from 'src/models/seller';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { FcmService } from 'src/services/fcm-service';
import { Platform } from '@ionic/angular';
import { MeliService } from 'src/services/meli-service';
import { AlertService } from 'src/services/alert-service';
import { AccountService } from 'src/services/account-service';
import { ModalService } from 'src/services/modal-service';
import { SellerMessage } from 'src/models/seller-message';

@Component({
  selector: "app-message",
  templateUrl: "tab-message.page.html",
  styleUrls: ["tab-message.page.scss"],
})
export class TabMessagePage implements OnInit, AfterViewInit, OnDestroy {

  public get isLogged(): boolean { return LocalStorage.IsLogged; }
  public get sellerInfo(): Seller { return LocalStorage.getLogin().data || new Seller(); }
  public get expired(): boolean { return LocalStorage.expired; }
  public loading: KeyValue<string, boolean>[] = [];
  public paymentLink: string;
  public exit: boolean = false;
  public messages: SellerMessage[] = [];

  constructor(private route: Router,
    private fcmService: FcmService,
    private platform: Platform,
    private meliService: MeliService,
    private alertService: AlertService,
    private accountService: AccountService,
    private modalService: ModalService) {
  }
  ngOnDestroy(): void {
    console.log('destroy!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit!');
  }

  ngOnInit() {
    this.getUserInfo();
    this.checkExpiredStatus();
    this.fcmService.initialize();
  }

  public meliSellerInfo() {
    return LocalStorage.getSelectedMeliAccount();
  }
  public getMessage(messageType: MessageTypeEnum) {
    return this.accountService.messages?.find(x => x.type == messageType);//LocalStorage.getMessage(messageType);
  }

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }

  public messageActivated(messageType: MessageTypeEnum) {
    return this.getMessage(messageType)?.activated && !this.expired;
  }

  public getUserInfo() {
    const login = LocalStorage.getLogin();
    this.loading['loading'] = true;
    this.meliService.getSellerInfo(login.data.id).subscribe((response) => {
      if (response.success) {
        login.data = response.data;
        LocalStorage.setLogin(login);
        this.getMeliAccountInfo();
      } else {
        this.loading['loading'] = false;
        this.alertService.showToastAlert(response.message);
      }

    }, (err) => {
      this.loading['loading'] = false;
      this.alertService.errorAlert(err);
    });
  }

  public getMeliAccountInfo() {
    this.loading['sellerInfo'] = true;
    this.meliService.getMeliAccountInfo(LocalStorage.getSelectedMeliAccount()?.id).subscribe((response) => {
      this.loading['sellerInfo'] = false;
      if (response.success) {
        LocalStorage.selectMeliAccount(response.data);
        this.accountService.messages = response.data.messages;
      }
      else {
        this.alertService.showToastAlert(response.message);
      }
    }, (error) => {
      this.loading['sellerInfo'] = false;
      this.alertService.showToastAlert(error?.error?.message || 'Houve um erro tentar obter suas informações.');
    }, () => { this.loading['sellerInfo'] = false; })
  }

  public checkExpiredStatus() {
    this.accountService.expiredStatus(LocalStorage.sellerId).subscribe((response) => {
      const notExpired = (response?.data?.notExpired);
      LocalStorage.expired = !notExpired;
      LocalStorage.isFreePeriod = response.data.isFreePeriod;

      if (notExpired && LocalStorage.isFreePeriod && LocalStorage.isFirstTime) {
        this.modalService.showFreePeriodModal();
      } else if (!notExpired) {
        this.modalService.showSubscribeModal();
      }
    });
  }

}
