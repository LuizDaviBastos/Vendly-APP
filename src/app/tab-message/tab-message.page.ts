import { LocalStorage as LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { MeliService } from 'src/services/meli-service';
import { KeyValue } from '@angular/common';
import { SellerInfo } from 'src/models/seller-info.model';

@Component({
  selector: "app-message",
  templateUrl: "tab-message.page.html",
  styleUrls: ["tab-message.page.scss"],
})
export class TabMessagePage implements OnInit {

  public get isLogged(): boolean {
    return LocalStorage.IsLogged;
  }

  public get sellerInfo(): SellerInfo {
    return LocalStorage.getLogin() || new SellerInfo();
  }

  public loading: KeyValue<string, boolean>[] = [];

  constructor(private route: Router, private toastController: ToastController, private meliService: MeliService) {
 
  }

  public message: string;

  async ngOnInit(): Promise<void> {
    this.loading['message'] = true;
   
    this.loading['message'] = false;
  }

  public async save() {
    this.loading['button'] = true;
    this.meliService.saveMessageAsync(LocalStorage.getLogin().id, this.message).then((response) => {
      this.presentToast();
    }).catch((err) => {
      this.presentToastError();
    }).finally(() => {
      this.loading['button'] = false;
    });
  }

  public setTag(tag: string) {
    this.message = `${this.message}${tag}`;
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'An error occurred while save the message',
      duration: 5000,
      position: 'top',
      keyboardClose: true,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        },
      ],
    });
    toast.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your message have been saved.',
      duration: 5000,
      position: 'top',
      keyboardClose: true,
      buttons: [
        {
          text: 'Done',
          role: 'cancel'
        },
      ],
    });
    toast.present();
  }

  public buildMessage(message: string) {
    this.message = message?.replace("@COMPRADOR", "<h1>COMPRADOR</h1>");
    return message;
  }

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }
}
