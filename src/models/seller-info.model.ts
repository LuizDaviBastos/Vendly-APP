import { RequestResponse } from "./request-response.model";
import { SellerMessage } from "./seller-message";

export class SellerInfo extends RequestResponse<any>{
    public id: number;
    public nickname: string;
    public registration_date: Date;
    public first_name: string;
    public last_name: string;
    public country_id: string;
    public email: string;
    public user_type: string;
    public logo: any;
    public points: number;
    public site_id: string;
    public permalink: string;
    public seller_experience: string;
    public thumbnail: Thumbnail;
    public produtosCount?: number;
    public messages: SellerMessage[];
}

export class Thumbnail {
    public picture_url: string;
}