import { Router } from '@angular/router';
import { LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage implements OnInit {

  constructor(private route: Router, private platform: Platform, private navCtrl: NavController) { }
  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  public logout() {
    LocalStorage.logout();
    this.route.navigateByUrl('/auth');
  }

  public goBack() {
    this.navCtrl.back();
  }

}
