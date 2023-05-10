import { Router } from '@angular/router';
import { LocalStorage } from '../../../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'password-tab-settings',
  templateUrl: 'password-settings.page.html',
  styleUrls: ['password-settings.page.scss']
})
export class PasswordSettingsPage implements OnInit {

  public password: string;
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
