import { HttpClient, HttpParams } from '@angular/common/http';
import * as MD5 from 'js-md5';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Global } from 'src/app/core/app-global';
import { environment } from 'src/environments/environment';

interface CacheData<T> {
    expireAt: number;
    data: T;
}

export class BaseService {

    private http: HttpClient;

    private version: string;

    constructor(protected baseUrl: string = environment.apiUrl) {
        this.http = Global.Injector.get(HttpClient);

        this.version = environment.version.split('.').join('');
    }

    protected get<T>(path: string, type: 'arraybuffer', params?: any, cache?: boolean, timeout?: number): Observable<ArrayBuffer>;
    protected get<T>(path: string, type: 'blob', params?: any, cache?: boolean, timeout?: number): Observable<Blob>;
    protected get<T>(path: string, type: 'text', params?: any, cache?: boolean, timeout?: number): Observable<string>;
    protected get<T>(path: string, type: 'json', params?: any, cache?: boolean, timeout?: number): Observable<T>;
    protected get<T>(path: string, type: any, params?: any, cache?: any, timeout?: number): any {
        const isCache: boolean = (typeof cache !== 'undefined' && cache);

        let key: string = '';
        if (isCache) {
            if (typeof timeout === 'undefined') {
                timeout = 10;
            }
            key = `${this.baseUrl + path}${type}${JSON.stringify(params)}`;
            key = MD5(key);

            const data: string = this.getCacheStorage().getItem(key);
            if (data) {
                try {
                    const response: CacheData<T> = JSON.parse(decodeURIComponent(atob(data)));
                    const cDate: Date = new Date();
                    const eDate: any = response.expireAt;
                    if (eDate === -1 || eDate > cDate) {
                        return of<T>(response.data);
                    } else {
                        this.getCacheStorage().removeItem(key);
                    }
                } catch (e) { }
            }
        }

        return this.http.get<T>(this.baseUrl + path, {
            params: this.getHttpParams(params),
            responseType: type,
        }).pipe(
            tap(
                response => {
                    if (isCache) {
                        let exp: number = -1;
                        const now: Date = new Date();
                        if (timeout !== -1) {
                            exp = now.setMinutes(now.getMinutes() + timeout);
                        }
                        const data: CacheData<T> = {
                            expireAt: exp,
                            data: response,
                        };
                        this.getCacheStorage().setItem(key, btoa(encodeURIComponent(JSON.stringify(data))));
                        // if (timeout !== -1) {
                        //     setTimeout(() => {
                        //         this.getCacheStorage().removeItem(key);
                        //     // }, timeout * 60000);
                        //     }, timeout);
                        // }
                    }
                }
            )
        );
    }

    protected post<T>(path: string, body: T, type: 'arraybuffer', params?: any): Observable<ArrayBuffer>;
    protected post<T>(path: string, body: T, type: 'blob', params?: any): Observable<Blob>;
    protected post<T>(path: string, body: T, type: 'text', params?: any): Observable<string>;
    protected post<T, U>(path: string, body: T, type?: 'json', params?: any): Observable<U>;
    protected post<T, U>(path: string, body: T, type: any, params?: any): Observable<U> {
        return this.http.post<U>(this.baseUrl + path, this.removeNulls<T>(body), {
            params: this.getHttpParams(params),
            responseType: type,
        });
    }

    protected put<T>(path: string, body: T, type: 'arraybuffer', params?: any): Observable<ArrayBuffer>;
    protected put<T>(path: string, body: T, type: 'blob', params?: any): Observable<Blob>;
    protected put<T>(path: string, body: T, type: 'text', params?: any): Observable<string>;
    protected put<T, U>(path: string, body: T, type: 'json', params?: any): Observable<U>;
    protected put<T, U>(path: string, body: T, type: any, params?: any): Observable<U> {
        return this.http.put<U>(this.baseUrl + path, this.removeNulls<T>(body), {
            params: this.getHttpParams(params),
            responseType: type,
        });
    }

    protected delete(path: string, type: 'arraybuffer', params?: any): Observable<ArrayBuffer>;
    protected delete(path: string, type: 'blob', params?: any): Observable<Blob>;
    protected delete(path: string, type: 'text', params?: any): Observable<string>;
    protected delete<T>(path: string, type: 'json', params?: any): Observable<T>;
    protected delete<T>(path: string, type: any, params?: any): Observable<T> {
        return this.http.delete<T>(this.baseUrl + path, {
            params: this.getHttpParams(params),
            responseType: type,
        });
    }

    protected head(path: string, params?: any): Observable<any> {
        return this.http.head(this.baseUrl + path, {
            params: this.getHttpParams(params),
        });
    }

    protected fetchLocal<T>(path: string, type: 'text'): Observable<string>;
    protected fetchLocal<T>(path: string, type: 'json'): Observable<T>;
    protected fetchLocal<T>(path: string, type: any): any {
        return this.http.get<T>(path + `?v=${this.version}`, {
            responseType: type,
        });
    }

    protected queryStringBuilder(path: string, params: any, baseUrl: string = this.baseUrl): string {
        let queryString: string = '';

        if (params && Object.keys(params).length > 0) {
            queryString = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
        }

        return baseUrl + path + queryString;
    }

    protected getUrlVars<T>(url: string): T {
        const vars: any = {};
        (url as any).replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            vars[key] = decodeURI(value);
        });

        return vars;
    }

    protected getFormData(model: any, files: FileList): FormData {
        const formData: FormData = new FormData();
        // if (files) {
        //     for (let i = 0; i < files.length; i++) {
        //         formData.append('file', files[i], files[i].name);
        //     }
        // }
        // Object.keys(model).forEach(key => { formData.append(key, model[key]); });

        return formData;
    }

    private getHttpParams(params: any): HttpParams {
        let httpParams: HttpParams = new HttpParams();

        if (params) {
            let temp: {} = null;
            temp = {};
            Object.keys(params).reduce((previousValue, currentValue) => {
                if (params[currentValue] != null) {
                    previousValue[currentValue] = params[currentValue];
                } else {
                    previousValue[currentValue] = '';
                }

                return previousValue;
            }, temp);
            Object.keys(temp).map(x => { httpParams = httpParams.set(x, temp[x]); });
        }

        return httpParams;
    }

    private removeNulls<T>(model: T): any {
        // let temp = {};
        // Object.keys(model).reduce((previousValue, currentValue) => {
        //     if (model[currentValue] !== null && model[currentValue] !== '') {
        //         previousValue[currentValue] = model[currentValue];
        //     }
        //     return previousValue;
        // }, temp);
        return model;
    }

    private getCacheStorage(): Storage {
        return window.sessionStorage;
    }
}
