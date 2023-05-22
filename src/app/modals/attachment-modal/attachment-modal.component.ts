import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AttachmentService } from 'src/services/attachment-service';
import { Attachment } from 'src/models/attachment.model';
import { SellerMessage } from 'src/models/seller-message';
import { HttpEventType } from '@angular/common/http';
import { AlertService } from 'src/services/alert-service';

@Component({
    selector: 'attachment-modal',
    templateUrl: './attachment-modal.component.html',
    styleUrls: ['./attachment-modal.component.scss']
})
export class AttachmentModal implements OnInit {

    @Input('saveMessage') saveMessage: (onSave?: (messageId: string) => void) => void;

    @ViewChild('inputFile') inputFile: ElementRef<HTMLInputElement>;
    public attachments: Attachment[] = [];
    public uploadProgress: number = 0;
    public progressText: string = '0%';
    public message: SellerMessage;
    public loading = {};
    constructor(public modalController: ModalController,
        private attachmentService: AttachmentService,
        private alertController: AlertController,
        private alertService: AlertService) { }

    ngOnInit() {
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
                { text: 'Excluir', handler: this.deleteAttachment.bind(this, attachment), cssClass: 'delete-button-confirm', }
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
            if (!this.isFileFormatValid(file.name)) {
                this.alertService.showToastAlert("O arquivo deve ter um dos seguintes formatos: jpg, jpeg, png, pdf, txt.", 10000);
                this.setInputStatusDefault();
                return;
            }
            if (file.size > 26214400) {
                this.alertService.showToastAlert("O arquivo deve ter um tamanho máximo de 20MB.", 8000);
                this.setInputStatusDefault();
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            this.saveAttachment(formData);
        }
    }

    private isFileFormatValid(filename: string): boolean {
        const validFormats = ['.jpg', '.jpeg', '.png', '.pdf', '.txt'];
        const fileExtension = this.getFileExtension(filename);

        return validFormats.includes(fileExtension.toLowerCase());
    }

    private getFileExtension(filename: string): string {
        const lastIndex = filename.lastIndexOf('.');
        if (lastIndex !== -1) {
            return filename.substr(lastIndex);
        }
        return '';
    }

    public saveAttachment(formData: FormData) {
        if(!this.message.id || this.message.id == '00000000-0000-0000-0000-000000000000') {
            this.saveMessage((messageId: string) => {
                this.message.id = messageId;
                this.saveAttachment(formData)
            });
            return;
        }

        this.loading['upload'] = true;
        this.attachmentService.saveAttachmentProgress(this.message, formData).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.progressText = `${percentDone}%`;
                this.uploadProgress = percentDone / 100;
            } else if (event.type === HttpEventType.Response) {
                this.setInputStatusDefault();
                if (event.body?.success) {
                    this.attachments.push(event.body.data);
                } else {
                    this.alertService.showToastAlert(event.body?.message);
                }
            }
        }, (err) => {
            this.setInputStatusDefault();
            this.alertService.errorAlert(err);
        });
    }

    private setInputStatusDefault() {
        this.loading['upload'] = false;
        this.inputFile.nativeElement.value = '';
        this.progressText = '0%';
        this.uploadProgress = 0;
    }
}