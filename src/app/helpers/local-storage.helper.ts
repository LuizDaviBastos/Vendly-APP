import { Country } from 'src/models/country.type';
import { LoginResponse } from '../../models/login-response';
import { SellerInfo } from 'src/models/seller-info.model';
import { MessageTypeEnum } from 'src/models/message-type.enum';
import { SellerMessage } from 'src/models/seller-message';
import { Uteis } from './Uteis';

export class LocalStorage {

    private static login: LoginResponse = null;
    private static country: Country = null;
    private static seletectMeliSellerInfo: SellerInfo = null;
    private static keys = {
        seller: 'seller-login',
        token: 'asm-token',
        meliSeller: 'meli-seller-id',
        country: 'asm-country',
        timeLeft: 'timeLeft',
        lastTimeSendCode: 'lastTimeSendCode',
        isFirstTime: 'isFirstTime',
        expired: 'expired',
        isFreePeriod: 'isFreePeriod'
    }


    public static set expired(value: boolean) {
        localStorage.setItem(this.keys.expired, `${value}`);
    }

    public static get expired(): boolean {
        return Uteis.parseToBoolean(localStorage.getItem(this.keys.expired));
    }

    public static set isFreePeriod(value: boolean) {
        localStorage.setItem(this.keys.isFreePeriod, `${value}`);
    }

    public static get isFreePeriod(): boolean {
        return Uteis.parseToBoolean(localStorage.getItem(this.keys.isFreePeriod));
    }

    public static get isFirstTime(): boolean {
        const isFirstItem = localStorage.getItem(this.keys.isFirstTime);
        if (isFirstItem) {
            return false;
        }
        localStorage.setItem(this.keys.isFirstTime, 'true');
        return true;
    }

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
        return login.data?.meliAccounts?.find(x => x.meliSellerId == selectedMeli.id)?.id;
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
            if (!this.seletectMeliSellerInfo) {
                let meliAccounts = this.getLogin()?.data?.meliAccounts;
                if (meliAccounts?.length > 0) {
                    return <SellerInfo>{ id: meliAccounts[0].meliSellerId };
                }
                return null;
            }
        }
        return this.seletectMeliSellerInfo;
    }

    public static meliInfoStored(): boolean {
        const meliInfo = <SellerInfo>JSON.parse(localStorage.getItem(this.keys.meliSeller));
        return this.seletectMeliSellerInfo != null || meliInfo != null;
    }

    public static updateMessage(sellerMessage: SellerMessage) {
        const meliAccount = this.getSelectedMeliAccount();
        const message = meliAccount?.messages?.find(x => x.type == sellerMessage.type);
        if(!message) {
            meliAccount.messages.push(sellerMessage);
        } else {
            const newMessages = meliAccount.messages.filter(x => x.type != sellerMessage.type);
            meliAccount.messages = [...newMessages, sellerMessage];
            this.selectMeliAccount(meliAccount);
        }
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
        localStorage.removeItem(this.keys.seller);
        this.setToken(null);
        localStorage.removeItem(this.keys.token);
        localStorage.removeItem(this.keys.meliSeller);
        localStorage.removeItem(this.keys.country);
        localStorage.removeItem(this.keys.timeLeft);
        localStorage.removeItem(this.keys.lastTimeSendCode);
        localStorage.removeItem(this.keys.isFirstTime);
        localStorage.removeItem(this.keys.isFreePeriod);
        localStorage.removeItem(this.keys.expired);

    }

    public static async logoutAsync() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.logout();
                resolve(true);
            }, 2000);
        });
    }

    public static getMessage(messageType: MessageTypeEnum) {
        const meliAccount = this.getSelectedMeliAccount();
        return meliAccount?.messages?.find(x => x.type == messageType);
    }


    public static updateHasMeliAccount(state: boolean) {
        let login = this.getLogin();
        login.hasMeliAccount = state;
        this.setLogin(login);
    }

    public static get settings(): ConfigurationStorage {
        return new ConfigurationStorage();
    }

    public static set timeLeft(value: number) {
        localStorage.setItem(this.keys.timeLeft, `${value}`);
    }

    public static set lastTimeSendCode(value: number) {
        localStorage.setItem(this.keys.lastTimeSendCode, `${value}`);
    }
    public static get lastTimeSendCode(): number {
        return +localStorage.getItem(this.keys.lastTimeSendCode);
    }

    public static get timeLeft(): number {
        const now = new Date().getTime();
        const lastSetLeftTime = this.lastTimeSendCode;
        if (!lastSetLeftTime) {
            this.timeLeft = -1;
            this.lastTimeSendCode = null;
            return -1;
        }
        const diff = now - lastSetLeftTime;
        const times = Math.floor(diff / 1000);
        if (times > 40) {
            this.timeLeft = -1;
            return -1;
        }
        const item = localStorage.getItem(this.keys.timeLeft);
        return (!!item ? +item : -1);
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