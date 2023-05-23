import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { AlertService } from 'src/services/alert-service';
import { AuthService } from 'src/services/auth-service';

@Component({
  selector: 'security-confirmation',
  templateUrl: './security-confirmation.component.html',
  styleUrls: ['./security-confirmation.component.scss'],
})
export class SecurityConfirmationComponent implements OnInit, OnDestroy {

  @Input('form') public formGroup: FormGroup;
  @Input('showLogout') public showLogout: boolean;
  @Input('isSignup') public isSignup: boolean;
  @Input('sellerId') public sellerId: string;
  @Output('onSuccess') onSuccessEvent: EventEmitter<any> = new EventEmitter();
  @Output('onError') onErrorEvent: EventEmitter<any> = new EventEmitter();

  public onSuccess: () => void;
  public goBack: () => void;
  public onError: (message: string) => void;

  public loading = {};
  public loadingModal: HTMLIonLoadingElement[] = [];

  public set timeLeft(value: number) {
    localStorage.setItem('timeLeft', `${value}`);
  }

  public get timeLeft(): number {
    const item = localStorage.getItem('timeLeft');
    return (!!item ? +item : -1);
  }

  public get intervals(): number[] {
    let _intervals: number[] = [];
    const item = localStorage.getItem('sendintervals');
    if (!!item) {
      _intervals = JSON.parse(item);
    }
    return _intervals;
  }

  private intervalId: any;

  constructor(private navCtrl: NavController, public modalController: ModalController,
    private authService: AuthService,
    private alertService: AlertService,
    private loadingController: LoadingController,
    private route: Router) { }

  async ngOnInit() {
    if (this.sellerId) {
      if (this.timeLeft > 0) {
        this.startCountDown();
      } else {
        await this.sendEmailConfirmationCode();
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  public async sendEmailConfirmationCode() {
    let id = this.sellerId;
    if (this.timeLeft > 0) return;

    await this.showLoading();
    this.authService.sendEmailConfirmationCode(id).subscribe((sendConfirmationResponse) => {
      if (sendConfirmationResponse.success) {
        this.alertService.showToastAlert(`Enviamos um código para o seu email.`, 2000, "top");
        this.startCountDown();
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
        this.timeLeft = -1;
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

  public logout() {
    LocalStorage.logout();
    this.route.navigateByUrl('/auth');
  }

  public startCountDown() {
    const agora = new Date();
    const startInSeconds = 40; //start time
    const time = (this.timeLeft > 0 ? this.timeLeft : startInSeconds)

    const dataFinal = new Date(agora.getTime());
    dataFinal.setSeconds(dataFinal.getSeconds() + time);

    this.intervalId = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = dataFinal.getTime() - agora;

      const times = Math.floor(diferenca / 1000)
      this.timeLeft = times ;
      console.log(this.timeLeft);
      if (diferenca < 0) {
        clearInterval(this.intervalId);
        this.timeLeft = 0;
      }
    }, 100);
  }

  public getTimeLeft(): string {
    let time: number = (this.timeLeft < 0 ? 0 : this.timeLeft);
    const horas = Math.floor(time / 3600);
    const minutos = Math.floor((time % 3600) / 60);
    const segundos = time % 60;

    const formatoHoras = horas < 10 ? `0${horas}` : `${horas}`;
    const formatoMinutos = minutos < 10 ? `0${minutos}` : `${minutos}`;
    const formatoSegundos = segundos < 10 ? `0${segundos}` : `${segundos}`;

    if (horas > 0) {
      return `${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
    } else {
      return `${formatoMinutos}:${formatoSegundos}`;
    }
  }

  public canResend() {
    return this.timeLeft == 0;
  }

}
