import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private zone: NgZone, private platform: Platform) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(window.navigator.platform == "Win32") {
          return;
        }
        if (event.url.includes("/edit") || event.url.includes("settings")) {
          
          StatusBar.setBackgroundColor({
            color: "#ebebeb"
          })
        } else {
          StatusBar.setBackgroundColor({
            color: "#FFDE33"
          })
        }
      }
    });

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const url = new URL(event.url);
      this.router.navigateByUrl(url.pathname);
    });
  }
}
