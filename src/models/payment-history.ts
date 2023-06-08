import { PaymentStatus } from "./enums/payment-status.enum";

export class PaymentHistory {
 
    public id: string;
    public createdDate: Date;
    public price: number;
    public userPaymentId: string;
    public status: PaymentStatus;
    public sellerId: string;
    public plan: string;
    /**
     *  public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Price { get; set; }
        public string? MetaData { get; set; }
        public Guid? UserPaymentId { get; set; }
        public PaymentStatus? Status { get; set; }

        public Guid SellerId { get; set; }

        [JsonIgnore]
        public virtual Seller Seller { get; set; }

        public Guid? SubscriptionPlanId { get; set; }
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
     * 
     * 
     */
}