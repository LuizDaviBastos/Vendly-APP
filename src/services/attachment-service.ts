import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Attachment } from '../models/attachment.model';
import { RequestResponse } from '../models/request-response.model';
import { SellerMessage } from '../models/seller-message';
import { SettingsService } from './settings-service';
import { HttpClientBase } from './http-base.service';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {
    public get apiHost(): string {
        return this.settingsService.getSettings()?.urlBaseApi;
    }

    constructor(private http: HttpClientBase, private platform: Platform, private settingsService: SettingsService) {

    }

    public saveAttachment(message: SellerMessage, formData: FormData) {
        const params = new HttpParams().append('messageId', message.id).append('messageType', message.type);
        return this.http.post<RequestResponse<Attachment>>(`api/attachment/save`, formData, { params: params });
    }

    public getAttachments(messageId: string) {
        const params = new HttpParams().append('messageId', messageId);
        return this.http.get<RequestResponse<Attachment[]>>(`api/attachment/get`, { params: params });
    }

    public deleteAttachment(attachmentId: string) {
        const params = new HttpParams().append('attachmentId', attachmentId);
        return this.http.delete<RequestResponse<Attachment[]>>(`api/attachment/delete`, { params: params });
    }

    public saveAttachmentProgress(message: SellerMessage, formData: FormData) {
        const params = new HttpParams().append('messageId', message.id).append('messageType', message.type);
        return this.http.postEvents<RequestResponse<Attachment>>(`api/attachment/save`, formData, {
            params: params,
            reportProgress: true,
            observe: 'events'
        });
    }
}
