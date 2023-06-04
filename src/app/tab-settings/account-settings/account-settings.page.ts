import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../helpers/local-storage.helper';
import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Seller } from 'src/models/seller';
import { SecurityConfirmationService } from 'src/services/security-confirmation-service';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: 'account-tab-settings',
  templateUrl: 'account-settings.page.html',
  styleUrls: ['account-settings.page.scss']
})
export class AccountSettingsPage implements OnInit {

  public get sellerInfo(): Seller {
    return LocalStorage.getLogin()?.data || new Seller();
  }
  
  public get canShowDelete(): boolean { return !LocalStorage.expired && !LocalStorage.isFreePeriod; }
  public loading = {};

  constructor(private route: Router, private platform: Platform,
    private navCtrl: NavController, private zone: NgZone,
    private alertController: AlertController,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private securityConfirmationService: SecurityConfirmationService,
    private accountService: AccountService) { }

  ngOnInit(): void {

  }

  public goBack() {
    this.navCtrl.back();
  }

  public changePassword() {
    this.securityConfirmationService.securityConfirmation().subscribe((modal) => {
      this.route.navigate(['password'], {
        relativeTo: this.activatedRoute,
      })
    });
  }

  public async deleteAccount() {
    const dialog = await this.alertController.create({
      header: 'Deseja deletar sua conta?',
      message: 'Esta ação irá desvincular suas contas do mercado livre e deletar sua conta do nosso aplicativo.',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Sim, Deletar', handler: () => {
            this._deleteAccount();
          }
        }
      ],
      cssClass: 'delete-account-alert',
    });
    dialog.present();
  }

  private _deleteAccount() {
    this.securityConfirmationService.securityConfirmation().subscribe((modal) => {
      this.loading['delete'] = true;
      this.accountService.deleteAccount(this.sellerInfo.id).subscribe((response) => {
        this.loading['delete'] = false;
        if (response.success) {
          LocalStorage.logout();
          this.route.navigateByUrl('/auth');
        }
        else {
          this.alertService.showToastAlert(response.message || 'Houve um erro ao deletar sua conta.');
        }
      }, (err) => {
        this.loading['delete'] = false;
        this.alertService.errorAlert(err);
      }, () => {
        this.loading['delete'] = false;
      });
    });
  }
}
