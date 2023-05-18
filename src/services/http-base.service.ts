import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings-service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HttpClientBase {
    public apiHost: string;

    constructor(private http: HttpClient, private settingsService: SettingsService) {

    }

    public get<T>(path: string, options?: HttpOptions): Observable<T> {
        return new Observable((obs) => {
            this.settingsService.loadSettings().subscribe((settings) => {
                this.apiHost = settings.urlBaseApi;
                const url = `${this.apiHost}/${path}`;
                this.http.get<T>(url, options).subscribe((rs) => obs.next(rs), (err) => obs.error(err), () => obs.complete());
            })
        })
    }

    public post<T>(path: string, body: any | null, options?: HttpOptions): Observable<T> {
        return new Observable((obs) => {
            this.settingsService.loadSettings().subscribe((settings) => {
                this.apiHost = settings.urlBaseApi;
                const url = `${this.apiHost}/${path}`;
                this.http.post<T>(url, body, options).subscribe((rs) => obs.next(rs), (err) => obs.error(err), () => obs.complete());
            })
        })
    }

    public postEvents<T>(path: string, body: any | null, options?: HttpOptionEvents): Observable<HttpEvent<T>> {
        return new Observable((obs) => {
            this.settingsService.loadSettings().subscribe((settings) => {
                this.apiHost = settings.urlBaseApi;
                const url = `${this.apiHost}/${path}`;
                this.http.post<T>(url, body, options).subscribe((rs) => obs.next(rs), (err) => obs.error(err), () => obs.complete());
            })
        })
    }

    public delete<T>(path: string, options?: HttpOptions) {
        return new Observable((obs) => {
            this.settingsService.loadSettings().subscribe((settings) => {
                this.apiHost = settings.urlBaseApi;
                const url = `${this.apiHost}/${path}`;
                this.http.delete<T>(url, options).subscribe((rs) => obs.next(rs), (err) => obs.error(err), () => obs.complete());
            })
        })
    }
}

export type HttpGetParams = {
    url: string,
    options?: HttpOptions
}

export type HttpOptions = {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body' | 'events' |any;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

export type HttpOptionEvents = {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: 'events';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

