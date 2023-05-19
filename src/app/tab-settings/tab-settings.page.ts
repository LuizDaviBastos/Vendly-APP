import { Router } from '@angular/router';
import { LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage implements OnInit {

  constructor(private route: Router, private platform: Platform, private navCtrl: NavController,
    private alertController: AlertController) { }
  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  public async logout() {
    const dialog = await this.alertController.create({
      header: 'Deseja sair da sua conta?',
      buttons: [
        { text: 'Voltar' },
        { text: 'Sim, sair', handler: this._logout.bind(this) }
      ],
      cssClass: 'logout-alert',
    });
    dialog.present();
  }

  private _logout() {
    LocalStorage.logout();
    this.route.navigateByUrl('/auth');
  }

  public goBack() {
    this.navCtrl.back();
  }

}
