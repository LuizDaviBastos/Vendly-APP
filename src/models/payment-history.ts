import { PaymentStatus } from "./enums/payment-status.enum";

export class PaymentHistory {
 
    public id: string;
    public createdDate: Date;
    public price: number;
    public userPaymentId: string;
    public status: PaymentStatus;
    public sellerId: string;
    public plan: string;
    public expireIn: Date;
}