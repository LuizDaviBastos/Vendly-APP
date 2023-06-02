import { LocalStorage as LocalStorage } from '../helpers/local-storage.helper';
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeyValue } from '@angular/common';
import { Seller } from 'src/models/seller';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { FcmService } from 'src/services/fcm-service';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: "app-message",
  templateUrl: "tab-message.page.html",
  styleUrls: ["tab-message.page.scss"],
})
export class TabMessagePage implements OnInit, AfterViewInit {

  public get isLogged(): boolean { return LocalStorage.IsLogged; }
  public get sellerInfo(): Seller { return LocalStorage.getLogin().data || new Seller(); }
  public get expired(): boolean { return LocalStorage.expired; }
  public loading: KeyValue<string, boolean>[] = [];
  public paymentLink: string;
  public exit: boolean = false;

  constructor(private route: Router,
    private fcmService: FcmService,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, () => {
        App.minimizeApp();
      });
    })
  }

  ngAfterViewInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      App.minimizeApp();
    });
  }

  async ngOnInit(): Promise<void> {
    this.platform.backButton.subscribeWithPriority(10, () => {
      App.minimizeApp();
    });
    this.fcmService.initialize();
  }

  public meliSellerInfo() {
    return LocalStorage.getSelectedMeliAccount();
  }
  public getMessage(messageType: MessageTypeEnum) {
    return LocalStorage.getMessage(messageType);
  }

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }

  public messageActivated(messageType: MessageTypeEnum) {
    return this.getMessage(messageType).activated && !this.expired;
  }
}
