import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['../../signup.component.scss', './step2.component.scss'],
})
export class Step2Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;
  @ViewChild('selectCountry') selectCountry: IonSelect;

  constructor() { }

  public countries = [
    { code: 'br', name: 'Brazil' },
    { code: 'ar', name: 'Argentina' },
    { code: 'mx', name: 'Mexico' }
  ];

  ngOnInit() {

  }

  public getControl(name) {
    return this.formGroup.get(name);
  }
}
