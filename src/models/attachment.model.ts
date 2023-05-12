export class Attachment {
    public id?: string;
    public name: string;
    public size: string;
    public messageId: string;
    public formData: FormData;
}

/*
 public Guid Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public Guid MessageId { get; set; }
        public virtual SellerMessage Message { get; set; }
*/