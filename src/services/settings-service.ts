import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { FireBaseService } from "./firebase-service";
import { Settings } from "../models/settings.model";

@Injectable({ providedIn: 'root' })
export class SettingsService {
    public settings: Settings = null;
    constructor(private fireBaseService: FireBaseService) {

    }

    public getSettings() {
        if (!this.settings) {
            this.loadSettings();
        } else {
            return this.settings;
        }
    }

    public loadSettings() {
        return new Observable<Settings>((obs) => {
            if(!this.settings) {
                this.fireBaseService.getSettings().subscribe((settings) => {
                    this.settings = settings;
                    obs.next(settings);
                }, (err) => {
                    obs.error(err);
                })
            } else {
                obs.next(this.settings);
            }
        })
    }
}