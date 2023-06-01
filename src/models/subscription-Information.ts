export class SubscriptionInformation {
    public id: string;
    public lastPayment: Date;
    public ExpireIn: Date;
    public sellerId: string;
    public expireInFormatted: string;
    public lastPaymentFormatted: string;
    public status: number;
    
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