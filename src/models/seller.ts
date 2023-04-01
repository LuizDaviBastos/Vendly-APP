import { MeliAccount } from "./meli-account";

export class Seller {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public meliAccounts: MeliAccount[];
}