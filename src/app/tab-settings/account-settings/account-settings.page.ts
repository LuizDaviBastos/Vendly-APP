import { Router } from '@angular/router';
import { LocalStorage } from '../../helpers/local-storage.helper';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Seller } from 'src/models/seller';

@Component({
  selector: 'account-tab-settings',
  templateUrl: 'account-settings.page.html',
  styleUrls: ['account-settings.page.scss']
})
export class AccountSettingsPage implements OnInit {

  public get sellerInfo(): Seller {
    return LocalStorage.getLogin().data || new Seller();
  }

  constructor(private route: Router, private platform: Platform, private navCtrl: NavController, private zone: NgZone) { }

  ngOnInit(): void {

  }

  public logout() {
    LocalStorage.logout();
    this.zone.run(() => {
      this.route.navigate(['/auth']);
    })
    
  }

  public goBack() {
    this.navCtrl.back();
  }
}
