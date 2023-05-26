import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public loading: boolean = false;

  @Input('previous') previusStep: () => void;
  @Input('next') nextStep: () => void;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {

  }

  public goBack() {
    this.navCtrl.back();
  }

  public emailInvalid() {
    const control = this.formGroup.get('email');
    return (control.touched && control.status == "INVALID");
  }

  public recoveryEmail() {

  }

}
