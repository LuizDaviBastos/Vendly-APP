import { LocalStorage as LocalStorage } from '../helpers/local-storage.helper';
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeyValue } from '@angular/common';
import { Seller } from 'src/models/seller';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { FcmService } from 'src/services/fcm-service';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { MeliService } from 'src/services/meli-service';
import { AlertService } from 'src/services/alert-service';
import { AccountService } from 'src/services/account-service';
import { ModalService } from 'src/services/modal-service';

@Component({
  selector: "app-message",
  templateUrl: "tab-message.page.html",
  styleUrls: ["tab-message.page.scss"],
})
export class TabMessagePage implements OnInit, AfterViewInit {

  public get isLogged(): boolean { return LocalStorage.IsLogged; }
  public get sellerInfo(): Seller { return LocalStorage.getLogin().data || new Seller(); }
  public get expired(): boolean { return LocalStorage.expired; }
  public loading: KeyValue<string, boolean>[] = [];
  public paymentLink: string;
  public exit: boolean = false;

  constructor(private route: Router,
    private fcmService: FcmService,
    private platform: Platform,
    private meliService: MeliService,
    private alertService: AlertService,
    private accountService: AccountService,
    private modalService: ModalService) {
  }

  ngAfterViewInit(): void {
  }

  async ngOnInit(): Promise<void> {
    this.getUserInfo();
    this.fcmService.initialize();
    this.checkExpiredStatus();
  }

  public meliSellerInfo() {
    return LocalStorage.getSelectedMeliAccount();
  }
  public getMessage(messageType: MessageTypeEnum) {
    return LocalStorage.getMessage(messageType);
  }

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }

  public messageActivated(messageType: MessageTypeEnum) {
    return this.getMessage(messageType).activated && !this.expired;
  }

  public getUserInfo() {
    const login = LocalStorage.getLogin();
    this.meliService.getSellerInfo(login.data.id).subscribe((response) => {
      if (response.success) {
        login.data = response.data;
        LocalStorage.setLogin(login);
      } else {
        this.loading['loading'] = false;
        this.alertService.showToastAlert(response.message);
      }

    }, (err) => {
      this.loading['loading'] = false;
      this.alertService.errorAlert(err);
    });

    this.meliService.getMeliAccountInfo(LocalStorage.getSelectedMeliAccount()?.id).subscribe((response) => {
      if (response.success) {
        LocalStorage.selectMeliAccount(response.data);
      }
      else {
        this.alertService.showToastAlert(response.message);
      }
    }, (error) => {
      this.alertService.showToastAlert(error?.error?.message || 'Houve um erro tentar obter suas informações.');
    })
  }

  public checkExpiredStatus() {
    this.accountService.expiredStatus(LocalStorage.sellerId).subscribe((response) => {
      LocalStorage.expired = !(response?.data?.notExpired);
      LocalStorage.isFreePeriod = response.data.isFreePeriod;

      if (response.data.notExpired && LocalStorage.isFreePeriod && LocalStorage.isFirstTime) {
        this.modalService.showFreePeriodModal();
      } else if (!response.data.notExpired) {
        this.modalService.showSubscribeModal();
      }
    });
  }

}
