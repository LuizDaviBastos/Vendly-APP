import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { PaymentLinkResponse } from 'src/models/payment-link-response';
import { SubscriptionPlan } from 'src/models/subscription-plan';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';
import { BrowserService } from 'src/services/browser-service';
import { FcmService } from 'src/services/fcm-service';
import { LocalStorageService } from 'src/services/local-storage-service';

@Component({
  selector: 'app-free-period',
  templateUrl: './free-period.component.html',
  styleUrls: ['./free-period.component.scss'],
})
export class FreePeriodComponent implements OnInit {

  public _title: string = 'Seu plano expirou';
  public _description: string = `Ops, parece que seu plano expirou. Continue com o plano e não deixe seus clientes esperando.`;
  public set title(value: string) { value && (this._title = value); }
  public set description(value: string) { value && (this._description = value); }

  constructor(private accountService: AccountService, private alertService: AlertService, private route: Router, private fcmService: FcmService,
    private localStorageService: LocalStorageService, private browserService: BrowserService, private modalController: ModalController) { }

  public paymentLink: string;
  public paymentLinkResponse: PaymentLinkResponse = new PaymentLinkResponse();
  public loading = {};
  public get nickname() {
    return LocalStorage.getSelectedMeliAccount().nickname;
  }
  ngOnInit() {
    //this.fcmService.initialize();
  }

  public async getPaymentLink(subscriptionPlan: SubscriptionPlan) {
    const loading = await this.alertService.showLoading();
    const sellerId = LocalStorage.sellerId;
    this.accountService.createPaymentLink(sellerId, subscriptionPlan.id).subscribe((response) => {
      if (response.success) {
        let paymentLinkResponse = response.data;
        this.browserService.openBrowser(paymentLinkResponse.init_point);
        this.modalController.dismiss();
      } else {
        this.alertService.showToastAlert("Houve um erro ao obter o link de pagamento.");
      }
    }, (err) => {
      this.alertService.errorAlert(err);
    }, () => {
      loading.dismiss()
    })
  }

  public async logout() {
    await this.localStorageService.logout();
  }

}
