import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'seller-avatar',
  templateUrl: './seller-avatar.component.html',
  styleUrls: ['./seller-avatar.component.scss'],
})
export class SellerAvatarComponent implements OnInit {

  @Input('url') public urlIcon:string;
  @Input('size') public size: string | 'small' | 'normal' = 'normal'
  constructor() { }

  ngOnInit() {}


}
