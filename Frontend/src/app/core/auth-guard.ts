import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from 'src/app/app-routing';
import { AppRoute, RouteBase } from 'src/app/app-routing.enum';
import { UserInfo } from 'src/app/shared/models/user-info';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private injector: Injector, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(observer => {

          if (!state.root.component)
          {
                //this.router.navigate([RouteBase.ErrorModule]);
            }
            observer.next(true);

            this.authService.checkIsLogin().subscribe(
                isLogin => {
                    if (!isLogin) {
                        this.authService.logout();

                        this.router.navigate([RouteBase.Login], { queryParams: { returnUrl: state.url }}).then(() => {
                          //window.location.reload();
                        });
                    }else
                    observer.next(isLogin);
                }
            );
        });

    }

  

    private skipRoute(route: string): boolean {
        return true;

        const routes: string[] = [Route.HOME_INDEX];

        return routes.indexOf(route) > -1;
    }
}
