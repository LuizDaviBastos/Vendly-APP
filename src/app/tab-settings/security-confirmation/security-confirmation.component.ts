import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/services/alert-service';
import { AuthService } from 'src/services/auth-service';

@Component({
  selector: 'security-confirmation',
  templateUrl: './security-confirmation.component.html',
  styleUrls: ['./security-confirmation.component.scss'],
})
export class SecurityConfirmationComponent implements OnInit {

  @Input('form') public formGroup: FormGroup;
  @Input('isSignup') public isSignup: boolean;
  @Input('sellerId') public sellerId: string;
  @Output('onSuccess') onSuccessEvent: EventEmitter<any> = new EventEmitter();
  @Output('onError') onErrorEvent: EventEmitter<any> = new EventEmitter();

  public onSuccess: () => void;
  public goBack: () => void;
  public onError: (message: string) => void;

  public loading = {};
  public loadingModal: HTMLIonLoadingElement[] = [];

  constructor(private navCtrl: NavController, public modalController: ModalController,
    private authService: AuthService,
    private alertService: AlertService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    if (this.sellerId) {
      await this.sendEmailConfirmationCode(this.sellerId);
    }
  }

  public async sendEmailConfirmationCode(id: string) {
    await this.showLoading();
    this.authService.sendEmailConfirmationCode(id).subscribe((sendConfirmationResponse) => {
      if (sendConfirmationResponse.success) {
        this.alertService.showToastAlert(`Enviamos um código para o seu email.`, 2000, "top");
      } else {
        this.alertService.showToastAlert(sendConfirmationResponse.message);
      }
    }, (err) => {
      this.hideLoading();
      this.alertService.errorAlert(err);
    }, () => {
      this.hideLoading();
    })
  }

  public confirm() {
    this.onSuccessEvent.emit();
    this.onSuccess && this.onSuccess();
  }

  public error(message: string) {
    this.onErrorEvent.emit(message);
    this.onError && this.onError(message);
  }

  public confirmEmail() {
    this.loading['confirm'] = true;
    const code = this.formGroup.get('code').value;

    this.authService.confirmEmail(this.sellerId, code).subscribe((confirmEmailResponse) => {
      this.loading['confirm'] = false;
      if (confirmEmailResponse.success) {
        this.confirm();
      } else {
        this.alertService.showToastAlert(confirmEmailResponse.message);
        this.error(`${confirmEmailResponse.message || 'Houve um erro ao confirmar o código.'}`)

      }
      this.clearCode();
    }, (err) => {
      this.clearCode();
      this.error(`${err?.error?.message || 'Houve um erro ao confirmar o código.'}`)
      this.loading['confirm'] = false;
      this.alertService.errorAlert(err);
    }, () => {
      this.loading['confirm'] = false;
    })
  }

  public formInvalid() {
    return (this.formGroup.status == "INVALID") || this.loading['confirm'];
  }

  public async showLoading() {
    let instance = await this.loadingController.create({
      duration: -1,
      message: "Enviando código...",
      animated: true
    });
    this.loadingModal.push(instance);
    instance.present();
  }

  public hideLoading() {
    for (let instance of this.loadingModal) {
      instance.dismiss();
    }
    this.loadingModal = [];
  }

  public clearCode() {
    this.formGroup.get('code').setValue('');
  }

}
