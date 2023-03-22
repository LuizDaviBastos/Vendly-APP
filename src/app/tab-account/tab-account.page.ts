import { LocalStorage } from '../helpers/local-storage.helper';
import { SellerInfo } from './../../models/seller-info.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: 'tab-account.page.html',
  styleUrls: ['tab-account.page.scss']
})
export class TabAccountPage implements OnInit {
  public localhost:string = '';
  public sellerInfo: SellerInfo = new SellerInfo();

  public get isLogged():boolean{
    return LocalStorage.IsLogged;
  }

  constructor(private httpClient: HttpClient, private route: Router) {}
  ngOnInit(): void {
    this.sellerInfo = LocalStorage.getLogin();
  }


}
