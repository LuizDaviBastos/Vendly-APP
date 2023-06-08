import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { SubscriptionInformation } from 'src/models/subscription-Information';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';
import { ModalService } from 'src/services/modal-service';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { BrowserService } from 'src/services/browser-service';

@Component({
  selector: 'subscribe-info',
  templateUrl: './subscribe-info.component.html',
  styleUrls: ['./subscribe-info.component.scss'],
})
export class SubscribeInfoComponent implements OnInit {

  public subscription: SubscriptionInformation = <SubscriptionInformation>{};
  public loading = {};
  public get expired(): boolean { return LocalStorage.expired; }

  constructor(private route: Router,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: ModalService,
    private currencyPipe: CurrencyPipe,
    private browserService: BrowserService) { }

  ngOnInit() {
    const sellerId = LocalStorage.sellerId;
    this.loading['info'] = true;
    this.accountService.getPaymentInformations(sellerId).subscribe((response) => {
      this.loading['info'] = false;
      if (response.success) {
        this.subscription = response.data;
        LocalStorage.isFreePeriod = response.data.isFreePeriod;
      } else {
        this.alertService.showToastAlert(response.message);
      }
    }, (err) => { },
      () => {
        this.loading['info'] = false;
      })

  }

  public goBack() {
    this.navCtrl.back();
  }

  public async pay(isPrePayment: boolean = false) {
    this.loading['pay'] = true;
    if (isPrePayment) {
      const sellerId = LocalStorage.sellerId;
      await this.modalService.showSubscribeModal('Pagamento antecipado', 'Faça um pagamento antecipado para garantir o serviço sem interrupções.');
      this.loading['pay'] = false;
    } else {
      await this.modalService.showSubscribeModal();
      this.loading['pay'] = false;
    }

  }

  public getFormattedPrice() {
    if (this.subscription.isFreePeriod) return "Grátis";
    return this.currencyPipe.transform(this.subscription.price, 'BRL', 'symbol');
  }

  public getDate(date: Date) {
    try {
      if (!date) {
        return '';
      }
      moment.locale('pt-br');
      const dataUTCObj = moment.utc(date);
      const l = dataUTCObj.local();
      const dataLocalF = l.format('DD [de] MMMM [de] YYYY');
      return dataLocalF;
    } catch {
      return '';
    }
  }
}
