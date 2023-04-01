import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorage } from "src/app/helpers/local-storage.helper";

export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = LocalStorage.token;
        if (token) {
            const headers = request.headers.set('Authorization', `Bearer ${token}`);
            const req = request.clone({ headers });
            return next.handle(req);
        }
        return next.handle(request);
    }
}