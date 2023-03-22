import { DatetimeOptions } from "@ionic/core";
import { RequestResponseBase } from "./request-response-base.model";

export class SellerInfo extends RequestResponseBase{
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
}

export class Thumbnail {
    public picture_url: string;
}