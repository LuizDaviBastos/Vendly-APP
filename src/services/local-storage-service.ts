import { Injectable } from '@angular/core';
import { AlertService } from 'src/services/alert-service';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    constructor(private alertService: AlertService, private route: Router) {
        
    }

    public async logout() {
        const loading = await this.alertService.showLoading('Encerrando sessão');
        LocalStorage.logoutAsync().then(() => {
            this.route.navigateByUrl('/auth');
        }).finally(() => {
            loading.dismiss();
        });
    }

}