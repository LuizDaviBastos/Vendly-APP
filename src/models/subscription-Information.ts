import { SubscriptionPlan } from "./subscription-plan";

export class SubscriptionInformation {
    public id: string;
    public expireIn: Date;
    public lastPayment: Date;
    public sellerId: string;
    public isFreePeriod: boolean;
    public price: number;
    public subscriptionPlan: SubscriptionPlan;
}
/**
 *   public Guid Id { get; set; }
        public BillingStatus? Status { get; set; }
        public DateTime? LastPayment { get; set; }
        public DateTime? ExpireIn { get; set; }


        public Guid SellerId { get; set; }
        [JsonIgnore]
        public virtual Seller Seller { get; set; }
 * 
 */