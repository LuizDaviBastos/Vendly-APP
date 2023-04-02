import { LocalStorage as LocalStorage } from '../../helpers/local-storage.helper';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
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
    private alertService: AlertService) {
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

  public getDescriptionInstruction() {
    let desc = "Configure uma mensagem para o seu comprador.";
    if (this.messageType == MessageTypeEnum.AfterSeller) desc = "Configure uma mensagem para o seu comprador receber assim que efetuar uma compra.";
    else if (this.messageType == MessageTypeEnum.Sent) desc = "Configure uma mensagem para o seu comprador receber assim que o pedido sair para entrega.";
    else if (this.messageType == MessageTypeEnum.Completed) desc = "Configure uma mensagem para o seu comprador receber assim que o pedido for entregue.";
    return desc;
  }

  public getTitle() {
    let title = "Compra realizada";
    if (this.messageType == MessageTypeEnum.AfterSeller) title = "Compra realizada";
    else if (this.messageType == MessageTypeEnum.Sent) title = "Pedido a caminho";
    else if (this.messageType == MessageTypeEnum.Completed) title = "Pedido entregue";
    return title;
  }
}
