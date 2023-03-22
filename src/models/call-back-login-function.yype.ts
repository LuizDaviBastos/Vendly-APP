import { SellerInfo } from "./seller-info.model";

export type CallBackLoginFunction = {
    
    (callBackLoginParam: CallBackLoginParam): void;
}

export class CallBackLoginParam {
    public errorMessage?: string = "";
    success: boolean = false;
    sellerInfo: SellerInfo
}