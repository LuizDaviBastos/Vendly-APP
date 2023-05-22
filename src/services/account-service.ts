import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Attachment } from '../models/attachment.model';
import { RequestResponse } from '../models/request-response.model';
import { HttpClientBase } from './http-base.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClientBase, private platform: Platform) {

    }

    public changePassword(sellerId: string, password: string, newPassword: string) {
        const body = {
            sellerId: sellerId,
            password: password,
            newPassword: newPassword
        }
        return this.http.post<RequestResponse<Attachment>>(`api/settings/changePassword`, body);
    }

    public deleteAccount(sellerId: string) {
        const params = new HttpParams().append('sellerId', sellerId);
        return this.http.get<RequestResponse<Attachment[]>>(`api/settings/deleteAccount`, { params: params });
    }

}
