import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../helpers/local-storage.helper';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';
import { Router } from '@angular/router';
import { FcmService } from 'src/services/fcm-service';
import { LocalStorageService } from 'src/services/local-storage-service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {

  constructor(private accountService: AccountService, private alertService: AlertService, private route: Router, private fcmService: FcmService,
    private localStorageService: LocalStorageService) { }
  public paymentLink: string;
  public get nickname() {
    return LocalStorage.getSelectedMeliAccount().nickname;
  }
  ngOnInit() {
    //this.fcmService.initialize();
    this.getPaymentLink();
  }

  public async getPaymentLink() {
    const loading = await this.alertService.showLoading();
    const sellerId = LocalStorage.sellerId;
    this.accountService.getPaymentLink(sellerId).subscribe((response) => {
      if (response.success) {
        this.paymentLink = response.data.init_point;
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
