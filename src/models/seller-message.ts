import { MessageTypeEnum } from "./message-type.enum";

export class SellerMessage {
    public message: string;
    public activated: boolean;
    public messageType: MessageTypeEnum;
    public meliAccountId: string;
}