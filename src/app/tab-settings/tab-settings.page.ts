import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { LocalStorageService } from 'src/services/local-storage-service';
import { ModalService } from 'src/services/modal-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SettingsService } from 'src/services/settings-service';
import { Settings } from 'src/models/settings.model';

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage implements OnInit {

  public options: InAppBrowserOptions = {
    zoom: "no",
    location: "no"
  };
  public settings: Settings = new Settings();


  constructor(private route: Router, private platform: Platform, private navCtrl: NavController,
    private alertController: AlertController, private localStorageService: LocalStorageService, 
    private modalService: ModalService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
    this.settingsService.loadSettings().subscribe((settings) => {
      this.settings = settings;
    })
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

  private async _logout() {
    await this.localStorageService.logout();
  }

  public goBack() {
    this.navCtrl.back();
  }

  public openContactModal() {
    this.modalService.showContactModal();
  }

  public openPrivacyPolicies() {
    InAppBrowser.create(this.settings.privacyPoliciesLink, "_system", this.options);
  }

}
