import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { LocalStorage } from "src/app/helpers/local-storage.helper";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private route: Router) { }


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
@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private route: Router) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        if(error.status == 401) {
                            LocalStorage.logoutAsync().then(() => {
                                this.route.navigateByUrl('/auth');
                            })
                        }
                        console.log('This is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}