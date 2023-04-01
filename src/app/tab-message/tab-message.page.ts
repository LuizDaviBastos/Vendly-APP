import { LocalStorage as LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MeliService } from 'src/services/meli-service';
import { KeyValue } from '@angular/common';
import { Seller } from 'src/models/seller';
import { SellerInfo } from 'src/models/seller-info.model';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: "app-message",
  templateUrl: "tab-message.page.html",
  styleUrls: ["tab-message.page.scss"],
})
export class TabMessagePage implements OnInit {

  public get isLogged(): boolean { return LocalStorage.IsLogged;   }
  public get sellerInfo(): Seller { return LocalStorage.getLogin().data || new Seller(); }
  public loading: KeyValue<string, boolean>[] = [];
  public get meliSellerInfo(): SellerInfo { return this.meliService.selectedMeliAccount; }
  
  constructor(private route: Router, private alertService: AlertService, private meliService: MeliService) { }

  async ngOnInit(): Promise<void> {
    this.meliService.getMeliAccountInfo(LocalStorage.getSelectedMeliAccount()).subscribe((response) => {
      if (response.success) {
        this.meliService.selectedMeliAccount = response.data;
      }
      else {
        this.alertService.showToastAlert('Um erro ocorreu ao obter suas informações.');
      }
    })
  }

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }
}
