import { MessageTypeEnum } from "./message-type.enum";

export class SellerMessage {
    public message: string;
    public activated: boolean;
    public type: MessageTypeEnum;
    public meliAccountId: string;
}