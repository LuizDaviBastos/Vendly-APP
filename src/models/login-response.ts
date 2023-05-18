import { Seller } from "./seller";

export class LoginResponse {
    public success: boolean;
    public hasMeliAccount: boolean;
    public message: string;
    public data: Seller;
    public token: string;
    public emailNotConfirmed: boolean;
}