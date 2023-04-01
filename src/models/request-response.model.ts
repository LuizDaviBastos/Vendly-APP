export abstract class RequestResponse<T> {
    public success: boolean;
    public message?: string;
    public data?: T;
}