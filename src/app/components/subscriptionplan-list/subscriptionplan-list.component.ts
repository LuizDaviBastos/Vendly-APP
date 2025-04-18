import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { SubscriptionPlan } from 'src/models/subscription-plan';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';
import { BrowserService } from 'src/services/browser-service';
import { FcmService } from 'src/services/fcm-service';
import { LocalStorageService } from 'src/services/local-storage-service';

@Component({
  selector: 'subscriptionplan-list',
  templateUrl: './subscriptionplan-list.component.html',
  styleUrls: ['./subscriptionplan-list.component.scss'],
})
export class SubscriptionplanListComponent implements OnInit {



  @Input('description') set description(value: string) { value && (this._description = value); }
  @Input('hidePayButton') public hidePayButton: boolean;
  @Input('isFree') public isFree: boolean;
  @Input('closeModal') public closeModal: () => void;
  @Output('onSelectedPlan') onSelectedPlan: EventEmitter<SubscriptionPlan> = new EventEmitter();

  public _description: string = 'Pague com o dinheiro em conta do Mercado Pago ou cartão.';
  public subscriptionPlans: SubscriptionPlan[] = [];
  public loading = {};

  constructor(private accountService: AccountService, private alertService: AlertService, private route: Router, private fcmService: FcmService,
    private localStorageService: LocalStorageService, private browserService: BrowserService) { }

  ngOnInit() {
    this.getSubscriptionPlans();
  }

  public getSubscriptionPlans() {
    this.loading['plans'] = true;
    this.accountService.getSubscriptionPlans(this.isFree).subscribe((response) => {
      this.loading['plans'] = false;
      this.subscriptionPlans = response.data;
    }, (err) => {
      //this.loading['plans'] = false;
    }, () => {
      this.loading['plans'] = false;
    });
  }

  public async pay(subscriptionPlan: SubscriptionPlan) {
    this.onSelectedPlan.emit(subscriptionPlan);
  }

  public async logout() {
    await this.localStorageService.logout();
  }

  public isFreeOk() {
    this.closeModal && this.closeModal();
  }

}
