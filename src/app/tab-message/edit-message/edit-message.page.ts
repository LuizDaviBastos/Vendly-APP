import { LocalStorage as LocalStorage } from '../../helpers/local-storage.helper';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { NavController } from '@ionic/angular';
import { MeliService } from '../../../services/meli-service';
import { KeyValue } from '@angular/common';
import { MessageTypeEnum } from '../../../models/message-type.enum';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import schema from './editor-plugins/schema';
import plugins from './editor-plugins/plugin';
import { AlertService } from 'src/services/alert-service';
import { Seller } from 'src/models/seller';
import { SellerInfo } from 'src/models/seller-info.model';
import { SellerMessage } from 'src/models/seller-message';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/modals/modal-page.component';
@Component({
  selector: "edit-message",
  templateUrl: "edit-message.page.html",
  styleUrls: ["edit-message.page.scss"],
})
export class EditMessagePage implements OnInit, OnDestroy {

  @Output('onChangeMessage') onChangeMessage: EventEmitter<SellerMessage> = new EventEmitter<SellerMessage>();

  public get sellerInfo(): Seller {
    return LocalStorage.getLogin().data || new Seller();
  }

  public get meliSeller(): SellerInfo {
    return LocalStorage.getSelectedMeliAccount();
  }

  public placeholder: string = '';
  public title: string = '';
  public instructionDesc: string = '';
  public loading: KeyValue<string, boolean>[] = [];
  public messageType: MessageTypeEnum;
  public editor: Editor;
  public message: SellerMessage = new SellerMessage();
  public toolbar: Toolbar = [
    ['bold', 'italic', 'underline'],
    ['bullet_list'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
    //[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ];
  private spans = {
    comprador: '<span data-mention-id="101" data-mention-name="COMPRADOR" data-mention-email="" class="prosemirror-mention-node">@COMPRADOR</span>',
    produto: '<span data-mention-id="102" data-mention-name="PRODUTO" data-mention-email="" class="prosemirror-mention-node">@PRODUTO</span>'
  }
  public loadingKeys = {button: 'button', message: 'message'}

  constructor(private route: Router,
    private meliService: MeliService,
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private modalController: ModalController) {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.messageType = +params.get('id');
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  async ngOnInit(): Promise<void> {
    this.loading[this.loadingKeys.message] = true;
    this.editor = new Editor({
      schema,
      plugins
    });
    this.editor.valueChanges.subscribe((jsonDoc) => {
      let html = toHTML(jsonDoc, schema);
      this.message.message = html;
    });

    this.setMessageTypeDescription();
    this.getMessage(this.messageType);
  }

  public async save() {
    try {
      this.loading[this.loadingKeys.button] = true;
      this.message.message = this.prepareToSendMessage(this.message.message);
      this.meliService.saveMessage(this.message).subscribe((response) => {
        if (response.success) {
          this.message = response.data;
          this.alertService.showToastAlert('Mensagem salva com sucesso.', 2000, 'bottom');
          LocalStorage.updateMessage(response.data);
          this.onChangeMessage.emit(response.data);
        }
        else {
          this.alertService.showToastAlert('Houve um erro ao tentar salvar a mensagem.');
        }

      }, (err) => {
        this.alertService.showToastAlert('Houve um erro ao tentar salvar a mensagem.');
        this.loading[this.loadingKeys.button] = false;
      }, () => {
        this.loading[this.loadingKeys.button] = false;
      });
    } catch {
      this.loading[this.loadingKeys.button] = false;
    }
  }

  public getMessage(messageType: MessageTypeEnum) {
    this.meliService.getMessage(LocalStorage.meliAccountId, messageType).subscribe((response) => {
      if (response.success) {
        this.message = response.data;
        this.message.message = this.prepareToReceiveMessage(this.message.message);
        this.editor.setContent(this.message.message);
      }
      else {
        this.alertService.showToastAlert('Houve um erro ao buscar a mensagem.');
      }
    }, (error) => {
      this.loading[this.loadingKeys.message] = false;
    }, () => {
      this.loading[this.loadingKeys.message] = false;
    });
  }

  public navigateTo(route: string) {
    this.route.navigateByUrl(route);
  }

  public goBack() {
    this.navCtrl.back();
  }

  public prepareToReceiveMessage(message: string) {
    if (!message) return message;
    let newMessage = message;
    newMessage = newMessage.replace('@COMPRADOR', this.spans.comprador);
    newMessage = newMessage.replace('@PRODUTO', this.spans.produto);
    return newMessage;
  }

  public prepareToSendMessage(message: string) {
    if (!message) return message;
    let newMessage = message;
    newMessage = newMessage.replace(this.spans.comprador, '@COMPRADOR')
    newMessage = newMessage.replace(this.spans.produto, '@PRODUTO')
    return newMessage;
  }

  public setMessageTypeDescription() {
    switch(this.messageType) {
      case MessageTypeEnum.AfterSeller:
          this.instructionDesc = "Configure uma mensagem para o seu comprador receber assim que efetuar uma compra.";
          this.title = "Compra realizada";
          this.placeholder = "Olá @COMPRADOR. Acabei de receber seu pedido!";
        break;
      case MessageTypeEnum.Sent: 
        this.instructionDesc = "Configure uma mensagem para o seu comprador receber assim que o pedido sair para entrega.";
        this.title = "Pedido a caminho";
        this.placeholder = "Seu @PRODUTO acabou de sair para entrega."
      break;
      case MessageTypeEnum.Completed:
        this.instructionDesc = "Configure uma mensagem para o seu comprador receber assim que o pedido for entregue.";
        this.title = "Pedido entregue";
        this.placeholder = "Esperamos que desfrute do seu novo produto."
      break;

    }
  }

  public getSwitchLabel() {
    return !!this.message.activated ? "Envio ativado" : "Envio desativado"
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }
}
