import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['../../signup.component.scss'],
})
export class Step1Component implements OnInit {

  @Input('form') formGroup: FormGroup;
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
}

