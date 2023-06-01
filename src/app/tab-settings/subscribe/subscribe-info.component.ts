import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { SubscriptionInformation } from 'src/models/subscription-Information';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: 'subscribe-info',
  templateUrl: './subscribe-info.component.html',
  styleUrls: ['./subscribe-info.component.scss'],
})
export class SubscribeInfoComponent implements OnInit {

  public subscription: SubscriptionInformation = <SubscriptionInformation>{};
  public loading = true;

  constructor(private route: Router,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit() {
    const sellerId = LocalStorage.sellerId;
    this.accountService.getPaymentInformations(sellerId).subscribe((response) => {
      this.loading = false;
      if (response.success) {
        this.subscription = response.data;
      } else {
        this.alertService.showToastAlert(response.message);
      }
    }, (err) => { },
      () => {
        this.loading = false;
      })
  }

  public goBack() {
    this.navCtrl.back();
  }

}
