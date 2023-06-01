import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { AlertService } from 'src/services/alert-service';
import { AuthService } from 'src/services/auth-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SettingsService } from 'src/services/settings-service';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['../../signup.component.scss', './step5.component.scss'],
})
export class Step5Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;
  @Input('sync') sync: boolean;
  @Input('error') error: boolean = true;
  @Input('errorMessage') errorMessage: string;

  constructor(private authService: AuthService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private route: Router) { }

  ngOnInit() { }

  public syncAccount() {
    const login = LocalStorage.getLogin();
    this.authService.addMeliAccount(true, login.data.country);
  }

  public synState() {
    return (this.formGroup.get('sync').value == 'true');
  }

  public createMeliAccount() {
    this.settingsService.loadSettings().subscribe((settings) => {
      this.openBrowser(settings.createAccountMeliUrl)
    }, (err) => {
      this.alertService.errorAlert(err);
    });
  }

  public openBrowser(url: string, browserTarget: string = "_system") {
    const options: InAppBrowserOptions = {
      zoom: "no",
      location: "no"
    };
    InAppBrowser.create(url, browserTarget, options);
  }

  public logout() {
    LocalStorage.logout();
    this.route.navigateByUrl('/auth');
  }
}


