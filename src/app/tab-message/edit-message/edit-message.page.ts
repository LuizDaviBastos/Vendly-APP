import { LocalStorage as LocalStorage } from '../../helpers/local-storage.helper';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { NavController, ToastController } from '@ionic/angular';
import { MeliService } from '../../../services/meli-service';
import { KeyValue } from '@angular/common';
import { SellerInfo } from '../../../models/seller-info.model';
import { MessageTypeEnum } from '../../../models/message-type.enum';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import schema from './editor-plugins/schema'
import plugins from './editor-plugins/plugin'
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';


@Component({
  selector: "edit-message",
  templateUrl: "edit-message.page.html",
  styleUrls: ["edit-message.page.scss"],
})
export class EditMessagePage implements OnInit {

  public get sellerInfo(): SellerInfo {
    return LocalStorage.getLogin() || new SellerInfo();
  }
  public loading: KeyValue<string, boolean>[] = [];
  public messageType: MessageTypeEnum;
  public editor: Editor;
  public html = 'Hello world!';
  public message: string = '';
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private route: Router,
    private toastController: ToastController,
    private meliService: MeliService,
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute) {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.messageType = +params.get('id');
    })
  }

  onChange(html: string) {
    console.log(this.html);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  async ngOnInit(): Promise<void> {
    this.editor = new Editor({
      schema,
      plugins
    });
    this.editor.valueChanges.subscribe((jsonDoc) => {
      let html = toHTML(jsonDoc);
      console.log(html);
    })

    this.getMessage(this.messageType);
  }

  public async save() {
    this.loading['button'] = true;
    this.meliService.saveMessageAsync(LocalStorage.getLogin().id, this.prepareToSendMessage(this.message)).then((response) => {
      this.presentToast();
    }).catch((err) => {
      this.presentToastError();
    }).finally(() => {
      this.loading['button'] = false;
    });
  }

  public getMessage(messageType: MessageTypeEnum) {
    this.loading['message'] = true;
    this.meliService.getMessageAsync(LocalStorage.getLogin().id).then((result) => {
      this.message = this.prepareToReceiveMessage(result.message);
    }).finally(() => {
      this.loading['message'] = false;
    });
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

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }

  public goBack() {
    this.navCtrl.back();
  }

  public prepareToReceiveMessage(message: string){
    let newMessage = message;
    newMessage = newMessage.replace('@COMPRADOR', `<span data-mention-id="101" data-mention-name="COMPRADOR" data-mention-email="" class="prosemirror-mention-node">@COMPRADOR</span>`)
    newMessage = newMessage.replace('@PRODUTO', `<span data-mention-id="102" data-mention-name="PRODUTO" data-mention-email="" class="prosemirror-mention-node">@PRODUTO</span>`)
    return newMessage;
  }

  public prepareToSendMessage(message: string){
    let newMessage = message;
    newMessage = newMessage.replace('<span data-mention-id="101" data-mention-name="COMPRADOR" data-mention-email="" class="prosemirror-mention-node">@COMPRADOR</span>','@COMPRADOR')
    newMessage = newMessage.replace(`<span data-mention-id="102" data-mention-name="PRODUTO" data-mention-email="" class="prosemirror-mention-node">@PRODUTO</span>`, '@PRODUTO')
    return newMessage;
  }
}
