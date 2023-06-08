import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  public history: PaymentHistory[] = [];
  constructor(private route: Router,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: ModalService,
    private currencyPipe: CurrencyPipe,
    private browserService: BrowserService) { }


  ngOnInit() {
    const sellerId = LocalStorage.sellerId;
    this.accountService.getPaymentHistory(sellerId).subscribe((response) => {
      this.history = response.data;
    })
  }

  public goBack() {
    this.navCtrl.back();
  }

  public canShowPayButton(item: PaymentHistory) {
    return item.status == PaymentStatus.Pending;
  }

  public getStatus(item: PaymentHistory) {
    if (item.status == PaymentStatus.Pending) return "Pendente";
    if (item.status == PaymentStatus.Success) return "Pago";
    if (item.status == PaymentStatus.Reject) return "Rejeitado";
  }

  public getColorStatus(item: PaymentHistory) {
    if(item.status == PaymentStatus.Pending) return "warning";
    if(item.status == PaymentStatus.Success) return "success";
    if(item.status == PaymentStatus.Reject) return "danger";
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
}
