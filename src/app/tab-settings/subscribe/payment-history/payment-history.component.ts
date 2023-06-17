import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { PaymentStatus } from 'src/models/enums/payment-status.enum';
import { PaymentHistory } from 'src/models/payment-history';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';
import { BrowserService } from 'src/services/browser-service';
import { ModalService } from 'src/services/modal-service';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit {
  public get sellerId(): string { return LocalStorage.sellerId; }
  public history: PaymentHistory[] = [];
  public skip = 0;
  public take = 10;
  public total = 0;
  constructor(private route: Router,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: ModalService,
    private currencyPipe: CurrencyPipe,
    private browserService: BrowserService) { }


  async ngOnInit() {
    const sellerId = LocalStorage.sellerId;
    await this.loadMore();
  }

  public goBack() {
    this.navCtrl.back();
  }

  public canShowPayButton(item: PaymentHistory) {
    return item.status == PaymentStatus.Pending && !this.itemExpired(item);
  }

  public getStatus(item: PaymentHistory) {
    if (this.itemExpired(item)) {
      return "Expirado"
    }
    if (item.status == PaymentStatus.Pending) return "Pendente";
    if (item.status == PaymentStatus.Success) return "Pago";
    if (item.status == PaymentStatus.Reject) return "Rejeitado";
  }

  public getColorStatus(item: PaymentHistory) {
    if (this.itemExpired(item)) {
      return "danger"
    }
    else if (item.status == PaymentStatus.Pending) return "warning";
    else if (item.status == PaymentStatus.Success) return "success";
    else if (item.status == PaymentStatus.Reject) return "danger";
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

  public getFormattedPrice(item: PaymentHistory) {
    return this.currencyPipe.transform(item.price, 'BRL', 'symbol');
  }

  onIonInfinite(ev) {
    this.loadMore();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  public async loadMore() {
    this.skip = this.history.length;
    if (this.skip >= this.total && this.skip != 0) return;
    let response = await this.accountService.getPaymentHistory(this.sellerId, this.skip, this.take).toPromise()
    this.history.push(...response.data);
    this.total = response.total;
  }

  public itemExpired(item: PaymentHistory) {
    return item.status != PaymentStatus.Success && item.status != PaymentStatus.Reject && new Date(item.expireIn)?.getTime() < new Date().getTime()
  }

  public async getPaymentLink(item: PaymentHistory) {
    const loading = await this.alertService.showLoading();
    this.accountService.getPaymentLink(item.id).subscribe((response) => {
      if (response.success) {
        loading.dismiss();
        this.browserService.openBrowser(response.data.init_point);
      } else {
        this.alertService.showToastAlert(response.message);
      }
    }, (err) => {
      loading.dismiss();
      this.alertService.errorAlert(err);
    }, () => {
      loading.dismiss();
    })
  }
}
