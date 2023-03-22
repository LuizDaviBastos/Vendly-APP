import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { SellerInfo } from '../../models/seller-info.model';
export class LocalStorage {

    public static setLogin(sellerInfo: SellerInfo) {
        const sellerInfoJson = JSON.stringify(sellerInfo);
        localStorage.setItem(this.keys.sellerInfo, sellerInfoJson);
    }

    public static getLogin(): SellerInfo {
        const sellerInfoJson = localStorage.getItem(this.keys.sellerInfo);
        return <SellerInfo>JSON.parse(sellerInfoJson) || <SellerInfo>{ success: false };
    }

    public static get IsLogged(): boolean {
        const sellerInfo = this.getLogin();
        return sellerInfo?.success || false;
    }

    public static logout() {
        localStorage.setItem(this.keys.sellerInfo, null);
    }

    public static keys = {
        sellerInfo: 'seller-info'
    }

    public static get settings(): ConfigurationStorage {
        return new ConfigurationStorage();
    }

    //FAKE
    public static fake() {
        return new LocalStorage();
    }

    public setLogin() {
        localStorage.setItem('seller-info', '{"success":true}');
    }
}
export class ConfigurationStorage {
    public setTheme(theme: 'dark' | 'light') {
        localStorage.setItem('theme', theme);
    }

    public loadSetting() {
        document.body.classList.toggle('dark', this.getSetting().theme == 'dark');
    }

    public getSetting() {
        return <Configuration>{
            theme: localStorage.getItem('theme')
        }
    }
}

export class Configuration {
    public theme: 'dark' | 'ligth';
}