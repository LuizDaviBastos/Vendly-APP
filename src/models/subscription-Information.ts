export class SubscriptionInformation {
    public id: string;
    public lastPayment: Date;
    public expireIn: Date;
    public sellerId: string;
    public expireInFormatted: string;
    public lastPaymentFormatted: string;
    public price: number;
    public status: number;
    public currentPlan: string;
    public isFreePeriod: boolean;
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