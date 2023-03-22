import { Router } from '@angular/router';
import { LocalStorage } from '../../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SellerInfo } from 'src/models/seller-info.model';

@Component({
  selector: 'account-tab-settings',
  templateUrl: 'account-settings.page.html',
  styleUrls: ['account-settings.page.scss']
})
export class AccountSettingsPage implements OnInit {

  public get sellerInfo(): SellerInfo {
    return LocalStorage.getLogin() || new SellerInfo();
  }

  constructor(private route: Router, private platform: Platform, private navCtrl: NavController) { }

  ngOnInit(): void {

  }

  public logout() {
    LocalStorage.logout();
    this.route.navigateByUrl('/auth');
  }

  public goBack() {
    this.navCtrl.back();
  }
}
