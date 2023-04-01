import { LoginResponse } from '../../models/login-response';
export class LocalStorage {
    private static login: LoginResponse = null;
    public static setLogin(login: LoginResponse) {
        const loginJson = JSON.stringify(login);
        localStorage.setItem(this.keys.seller, loginJson);
        localStorage.setItem(this.keys.token, login.token);
    }

    public static getLogin(): LoginResponse {
        if(!this.login) {
            const loginJson = localStorage.getItem(this.keys.seller);
            this.login = <LoginResponse>JSON.parse(loginJson) || <LoginResponse>{ success: false };
        }
        return this.login;
    }

    public static get IsLogged(): boolean {
        const loginInfo = this.getLogin();
        return loginInfo?.success || false;
    }

    public static selectMeliAccount(meliSellerId: number){
        localStorage.setItem(this.keys.meliSeller, `${meliSellerId}`);
    }

    public static getSelectedMeliAccount(): number | undefined {
        let meliSellerId: number = +localStorage.getItem(this.keys.meliSeller) || null;
        if(!meliSellerId) {
            const login = this.getLogin();
            meliSellerId = login.data.meliAccounts[0].meliSellerId;
            this.selectMeliAccount(meliSellerId);
        }
        return meliSellerId;
    }


    public static get token(): string {
        return localStorage.getItem(this.keys.token);
    }

    public static logout() {
        localStorage.setItem(this.keys.seller, null);
    }

    private static keys = {
        seller: 'seller-login',
        token: 'asm-token',
        meliSeller: 'meli-seller-id'
    }

    public static get settings(): ConfigurationStorage {
        return new ConfigurationStorage();
    }

    //FAKE
    public static fake() {
        return  {
            setLogin() {
                localStorage.setItem(this.keys.seller, '{"success":true}');
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