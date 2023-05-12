import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Platform } from '@ionic/angular';
import { Attachment } from '../models/attachment.model';
import { RequestResponse } from '../models/request-response.model';
import { SellerMessage } from 'src/models/seller-message';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {
    public apiHost: string = environment.urlBaseApi;

    constructor(private http: HttpClient, private platform: Platform) {
    }

    public saveAttachment(message: SellerMessage, formData: FormData) {
        const params = new HttpParams().append('messageId', message.id).append('messageType', message.type);
        return this.http.post<RequestResponse<Attachment>>(`${this.apiHost}/api/attachment/save`, formData, { params: params });
    }

    public getAttachments(messageId: string) {
        const params = new HttpParams().append('messageId', messageId);
        return this.http.get<RequestResponse<Attachment[]>>(`${this.apiHost}/api/attachment/get`, { params: params });
    }

    public deleteAttachment(attachmentId: string) {
        const params = new HttpParams().append('attachmentId', attachmentId);
        return this.http.delete<RequestResponse<Attachment[]>>(`${this.apiHost}/api/attachment/delete`, { params: params });
    }
}
