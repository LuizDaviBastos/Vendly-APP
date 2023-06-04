import { Injectable } from "@angular/core";
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Settings } from "../models/settings.model";

@Injectable({ providedIn: 'root' })
export class FireBaseService {
    item$: Observable<Settings[]>;
    constructor(private firestore: Firestore) {

    }

    public getSettings() {
        return new Observable<Settings>((subscriber) => {
            const collectionRef = collection(this.firestore, "settings");
            collectionData(collectionRef).subscribe((documents) => {
                if (documents && documents.length > 0) {
                    const data = documents[0];
                    subscriber.next(<Settings>{
                        urlBaseApi: data.urlBaseApi,
                        createAccountMeliUrl: data.createAccountMeliUrl,
                        supportEmail: data.supportEmail,
                        whatsappSupportLink: data.whatsappSupportLink,
                    })
                } else {
                    subscriber.error("Não foi possivel obter as configurações.");
                }
            })
        });

    }

}