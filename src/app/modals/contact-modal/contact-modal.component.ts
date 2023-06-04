import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Settings } from 'src/models/settings.model';
import { SettingsService } from 'src/services/settings-service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }
  public settings: Settings = new Settings();
  public options: InAppBrowserOptions = {
    zoom: "no",
    location: "no"
  };

  ngOnInit() {
    this.settingsService.loadSettings().subscribe((sett) => {
      this.settings = sett;
    });
  }

  public openWhatsapp() {
    
    const url = this.settings.whatsappSupportLink;
    InAppBrowser.create(url, "_system", this.options);
  }

  public openEmail() {
    const email = this.settings.supportEmail;
    //const url = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    const url = `mailto:${email}`;
    InAppBrowser.create(url, "_system", this.options);
  }

}
