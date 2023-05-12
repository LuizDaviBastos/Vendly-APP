import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AttachmentService } from 'src/services/attachment-service';
import { Attachment } from 'src/models/attachment.model';
import { SellerMessage } from 'src/models/seller-message';

@Component({
    selector: 'attachment-modal',
    templateUrl: './attachment-modal.component.html',
    styleUrls: ['./attachment-modal.component.scss']
})
export class AttachmentModal implements OnInit {

    @ViewChild('inputFile') inputFile: ElementRef<HTMLInputElement>;
    public attachments: Attachment[] = [];
    public message: SellerMessage;
    public loading = {};
    constructor(public modalController: ModalController, private attachmentService: AttachmentService, private alertController: AlertController) { }

    async ngOnInit() {
        this.getAttachments();
    }

    public getAttachments() {
        this.loading['attachments'] = true;
        this.attachmentService.getAttachments(this.message.id).subscribe((result) => {
            this.attachments = result.data;
            this.loading['attachments'] = false;
        })
    }

    public deleteAttachment(attachment: Attachment) {
        this.loading[`delete${attachment.id}`] = true;
        this.attachmentService.deleteAttachment(attachment.id).subscribe(() => {
            this.attachments = this.attachments.filter(x => x.id != attachment.id);
            this.loading[`delete${attachment.id}`] = false;
        });
    }

    public async confirmDelete(attachment: Attachment) {
        const dialog = await this.alertController.create({
            header: 'Excluir arquivo',
            message: `"${attachment.name}" será definitivamente excluido.`,
            buttons: [
                { text: 'Cancelar', cssClass: 'delete-button-cancel' },
                { text: 'Excluir', handler: this.deleteAttachment.bind(this, attachment),  cssClass: 'delete-button-confirm', }
            ]
        });
        dialog.present();
    }

    public async chooseFile() {
        this.inputFile.nativeElement.click();
    }
    
    public onFileSelected(e) {
        if (this.inputFile.nativeElement.files.length > 0) {
            const file: File = this.inputFile.nativeElement.files[0];
            const formData = new FormData();
            formData.append('file', file);
            this.saveAttachment(formData);
        }
    }

    public saveAttachment(formData: FormData) {
        this.loading['upload'] = true;
        this.attachmentService.saveAttachment(this.message, formData).subscribe((result) => {
            this.attachments.push(result.data);
            this.loading['upload'] = false;
            this.inputFile.nativeElement.value = '';
        })
    }
}