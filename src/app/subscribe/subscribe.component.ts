import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../helpers/local-storage.helper';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';
import { Router } from '@angular/router';
import { FcmService } from 'src/services/fcm-service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {

  constructor(private accountService: AccountService, private alertService: AlertService, private route: Router, private fcmService: FcmService) { }
  public paymentLink: string;
  ngOnInit() {
    this.fcmService.initialize();
    this.getPaymentLink();
  }

  public getPaymentLink() {
    const sellerId = LocalStorage.sellerId;
    this.accountService.getPaymentLink(sellerId).subscribe((response) => {
      if (response.success) {
        this.paymentLink = response.data.init_point;
      } else {
        this.alertService.showToastAlert("Houve um erro ao obter o link de pagamento.");
      }
    }, (err) => {
      this.alertService.errorAlert(err);
    })
  }
  public async logout() {
    LocalStorage.logoutAsync().then(() => {
      console.log('logout');
      this.route.navigateByUrl('/auth');
    });
    
  }

}
