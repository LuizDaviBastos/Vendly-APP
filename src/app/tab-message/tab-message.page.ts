import { LocalStorage as LocalStorage } from '../helpers/local-storage.helper';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MeliService } from 'src/services/meli-service';
import { KeyValue } from '@angular/common';
import { Seller } from 'src/models/seller';
import { SellerInfo } from 'src/models/seller-info.model';
import { AlertService } from 'src/services/alert-service';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { AccountService } from 'src/services/account-service';
import { FcmService } from 'src/services/fcm-service';

@Component({
  selector: "app-message",
  templateUrl: "tab-message.page.html",
  styleUrls: ["tab-message.page.scss"],
})
export class TabMessagePage implements OnInit, AfterViewInit {

  public get isLogged(): boolean { return LocalStorage.IsLogged; }
  public get sellerInfo(): Seller { return LocalStorage.getLogin().data || new Seller(); }
  public loading: KeyValue<string, boolean>[] = [];
  public paymentLink: string;

  constructor(private route: Router,
    private alertService: AlertService,
    private meliService: MeliService,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
    private fcmService: FcmService) { }

  ngAfterViewInit(): void {

  }

  async ngOnInit(): Promise<void> {
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
}
