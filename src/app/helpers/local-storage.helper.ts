import { Country } from 'src/models/country.type';
import { LoginResponse } from '../../models/login-response';
import { SellerInfo } from 'src/models/seller-info.model';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { SellerMessage } from 'src/models/seller-message';
export class LocalStorage {
    private static login: LoginResponse = null;
    private static country: Country = null;
    private static seletectMeliSellerInfo: SellerInfo = null;

    public static get sellerId(): string {
        return this.getLogin().data.id;
    }

    public static setLogin(login: LoginResponse) {
        const loginJson = JSON.stringify(login);
        localStorage.setItem(this.keys.seller, loginJson);
        this.login = login;
        this.setToken(login.token);
    }

    public static get meliAccountId(): string {
        const login = this.getLogin();
        const selectedMeli = this.getSelectedMeliAccount();
        return login.data.meliAccounts.find(x => x.meliSellerId == selectedMeli.id).id;
    }

    public static setToken(token: string) {
        localStorage.setItem(this.keys.token, token);
    }

    public static getLogin(): LoginResponse {
        if (!this.login) {
            const loginJson = localStorage.getItem(this.keys.seller);
            this.login = <LoginResponse>JSON.parse(loginJson) || null;
        }
        return this.login;
    }

    public static get IsLogged(): boolean {
        const loginInfo = this.getLogin();
        return (loginInfo?.success || false) && !!this.token && !loginInfo.emailNotConfirmed;
    }

    public static selectMeliAccount(meliSellerInfo: SellerInfo) {
        localStorage.setItem(this.keys.meliSeller, JSON.stringify(meliSellerInfo));
        this.seletectMeliSellerInfo = meliSellerInfo;
    }

    public static getSelectedMeliAccount(): SellerInfo {
        if (!this.seletectMeliSellerInfo) {
            this.seletectMeliSellerInfo = <SellerInfo>JSON.parse(localStorage.getItem(this.keys.meliSeller));
            if (!this.seletectMeliSellerInfo) return <SellerInfo>{ id: this.getLogin().data.meliAccounts[0].meliSellerId };
        }
        return this.seletectMeliSellerInfo;
    }

    public static meliInfoStored(): boolean {
        const meliInfo = <SellerInfo>JSON.parse(localStorage.getItem(this.keys.meliSeller));
        return this.seletectMeliSellerInfo != null || meliInfo != null;
    }

    public static getMessage(messageType: MessageTypeEnum) {
        const meliAccount = this.getSelectedMeliAccount();
        const login = this.getLogin();
        const cMeliAccount = login.data.meliAccounts.find(x => x.meliSellerId == meliAccount.id);
        const message = cMeliAccount?.messages?.find(x => x.type == messageType) || <SellerMessage>{ activated: false, type: messageType };
        return message;
    }

    public static updateMessage(sellerMessage: SellerMessage) {
        this.meliAccountId
        const login = this.getLogin();
        let meliAccount = login.data.meliAccounts.find(x => x.id == this.meliAccountId);
        let messages = meliAccount?.messages?.filter(x => x.type != sellerMessage.type);
        messages.push(sellerMessage);
        meliAccount.messages = messages;
        this.setLogin(login);
    }

    public static setCountry(country: Country) {
        this.country = country;
        localStorage.setItem(this.keys.country, country);
    }

    public static getCountry() {
        if (!this.country) {
            this.country = <Country>(localStorage.getItem(this.keys.country) || 'br');
        }
        return this.country;
    }

    public static get token(): string {
        return localStorage.getItem(this.keys.token);
    }

    public static logout() {
        this.login = null;
        this.seletectMeliSellerInfo = null;
        localStorage.setItem(this.keys.seller, null);
        localStorage.setItem(this.keys.meliSeller, null);
        this.setToken(null);
    }

    public static updateHasMeliAccount(state: boolean) {
        let login = this.getLogin();
        login.hasMeliAccount = state;
        this.setLogin(login);
    }


    private static keys = {
        seller: 'seller-login',
        token: 'asm-token',
        meliSeller: 'meli-seller-id',
        country: 'asm-country'
    }

    public static get settings(): ConfigurationStorage {
        return new ConfigurationStorage();
    }

    //FAKE
    public static fake() {
        return {
            setLogin() {
                localStorage.setItem(this.keys.seller, '{"success":true, "token": true}');
            }
        }
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