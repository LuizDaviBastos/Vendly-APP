import { Country } from "./country.type";
import { MeliAccount } from "./meli-account";

export class Seller {
    public id: string;
    public firstName?: string;
    public fullName: string;
    public email: string;
    public password: string;
    public country: Country;
    public confirmedEmail: boolean;
    public code: string;
    public meliAccounts: MeliAccount[];
}