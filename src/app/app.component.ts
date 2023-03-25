import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  }

}
