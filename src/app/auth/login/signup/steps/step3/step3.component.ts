import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['../../signup.component.scss', './step3.component.scss'],
})
export class Step3Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;
  
  constructor() { }

  ngOnInit() { }



}
