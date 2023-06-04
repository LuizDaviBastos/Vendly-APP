import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Injectable({
    providedIn: 'root'
})
export class BrowserService {

    constructor() {
    }

    public openBrowser(url: string, browserTarget: string = "_system") {
        const options: InAppBrowserOptions = {
            zoom: "no",
            location: "no"
        };
        return InAppBrowser.create(url, browserTarget, options);
    }
}
