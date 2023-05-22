import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AlertService } from "./alert-service";
import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SecurityConfirmationComponent } from "src/app/tab-settings/security-confirmation/security-confirmation.component";
import { LocalStorage } from "src/app/helpers/local-storage.helper";

@Injectable({ providedIn: 'root' })
export class SecurityConfirmationService {

    public formGroup: FormGroup = new FormGroup({
        code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[0-9]*$")])
    });

    private get sellerId(): string {
        return LocalStorage.getLogin().data.id;
    }

    private modal: HTMLIonModalElement[] = [];
    constructor(private modalController: ModalController, private alertService: AlertService) { }

    public securityConfirmation(): Observable<HTMLIonModalElement[]> {
        return new Observable<HTMLIonModalElement[]>((subs) => {
            this.modalController.create({
                component: SecurityConfirmationComponent,
                animated: true,
                breakpoints: [0, 1],
                backdropDismiss: false,
                componentProps: {
                    goBack: () => {
                        this.dismissModals();
                    },
                    onSuccess: () => {
                        this.dismissModals();
                        subs.next(this.modal);
                        subs.complete();
                    },
                    formGroup: this.formGroup,
                    sellerId: this.sellerId
                },
            }).then((modal) => {
                this.modal.push(modal);
                modal.present();
            })
        });
    }

    public dismissModals() {
        for(let cModal of this.modal) {
            cModal.dismiss();
        }
    }
}