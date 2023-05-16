import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['../../signup.component.scss', './step5.component.scss'],
})
export class Step5Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;

  constructor() { }

  ngOnInit() { }

  public syncAccount() {
    this.formGroup.get('sync').setValue(true);
  }

}


