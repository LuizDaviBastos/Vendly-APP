import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorage } from "src/app/helpers/local-storage.helper";

export class AuthInterceptor implements HttpInterceptor {
    constructor() {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = LocalStorage.token;
        if (authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }
        return next.handle(request);
    }
}