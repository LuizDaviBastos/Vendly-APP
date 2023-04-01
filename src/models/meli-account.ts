import { SellerMessage } from "./seller-message";

export class MeliAccount {
    public id: string;
    public meliSellerId: number;
    public accessToken:string;
    public refreshToken: string;
    public sellerId: string;
    public messages: SellerMessage[];
}