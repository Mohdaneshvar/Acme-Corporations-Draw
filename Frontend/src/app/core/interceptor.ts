import { HttpErrorResponse, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, first, flatMap, map, mergeMap } from 'rxjs/operators';
import { RouteBase } from 'src/app/app-routing.enum';
import { Token } from 'src/app/shared/models/token';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { getTokenData } from './store/selector';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

    constructor(private router: Router, private store: Store<any>, private injector: Injector, private toastService: ToastService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.store.select<Token>(getTokenData).pipe(
            first(),
            flatMap(token => {
                const authReq: HttpRequest<any> = !!token.token ? this.injectToken(req, token.token) : req;

                return next.handle(authReq).pipe(
                    map(event => {
                        switch (event.type) {
                            case HttpEventType.Response: {
                                const version: string = event.headers.get('x-client-version');
                                if (environment.apiVersion < Number(version)) {
                                    window.location.reload();
                                }
                            }
                        }

                        return event;
                    }),
                    catchError(errorResponse => {
                        if (errorResponse instanceof HttpErrorResponse) {
                            if (errorResponse.status === 401) {
                                const authService = this.injector.get(AuthService);
                                const rToken: Token = authService.getRefreshToken();
                                if (rToken) {
                                    return authService.newAccessToken().pipe(
                                        mergeMap(accessToken => {
                                            return next.handle(this.injectToken(req, accessToken));
                                        })
                                    );
                                } else {
                                    authService.logout();
                                    this.router.navigate([RouteBase.Login]).then(() => {
                                      window.location.reload();
                                    });
                                }
                            } else {
                                // if (environment.production) {
                                //     this.router.navigate([RouteBase.ErrorModule], { queryParams: { code: errorResponse.status } });
                                // } else {
                                if (errorResponse.error.error !== undefined)
                                    this.toastService.add('error', errorResponse.error.error ?? 'خطا', '');
                                else if (errorResponse.error !== undefined)
                                    this.toastService.add('error', errorResponse.error ?? 'خطا', '');
                                else
                                    this.toastService.add('error', 'خطا', '');
                                if (!environment.production)
                                    console.error(req, errorResponse);
                                //}
                            }
                        }

                        return throwError(errorResponse);
                    })
                );
            })
        );
    }

    private injectToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
