import { ValidateType } from "./enums/validate-type.enum";

export class SubscriptionPlan {
 public id: string;
 public name: string;
 public price: number;
 public isFree: boolean;
 public validateValue: number;
 public validateType: ValidateType;
}