import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Token } from 'src/app/shared/models/token';
import { AppKey, AppSettingService } from '../app-setting';
import { TokenAction, UserInfoAction } from '../store/action';
import { BaseService } from './base.service';
import { JwtModule } from "@auth0/angular-jwt";
import { userInfo } from 'node:os';
import { UserInfo } from 'src/app/shared/models/user-info';
import { Role } from 'src/app/app-role';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })

export class AuthService extends BaseService {

    constructor(private store: Store<any>, private appSetting: AppSettingService,private jwtHelper: JwtHelperService) {
        super();

        this.getAccessToken();
        this.getUserInfo();
    }

    public checkIsLogin(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            var isLogin=false;
            const token =this.getAccessToken();
            if (token)
                isLogin= !this.jwtHelper.isTokenExpired(token.token);
            observer.next(isLogin);
        });
    }

    public newAccessToken(): Observable<string> {
        return new Observable<string>(observer => {
            super.post<Token, string>('api/login/accesstoken', this.getRefreshToken(), 'json').subscribe(
                token => {
                    this.setAccessToken(token);

                    observer.next(token);
                }
            );
        });
    }

    public setAccessToken(token: string): void {
        this.store.dispatch(TokenAction({ token }));
        this.appSetting.setItem<string>(AppKey.AccessToken, token);
    }

    public getAccessToken(): Token {
        const val: string = this.appSetting.getItem<string>(AppKey.AccessToken);
        if (val) {
            this.store.dispatch(TokenAction({ token: val }));

            return { token: val };
        }

        return null;
    }

    public setRefreshToken(token: string): void {
        this.appSetting.setItem<string>(AppKey.RefreshToken, token);
    }

    public getRefreshToken(): Token {
        const val: string = this.appSetting.getItem<string>(AppKey.RefreshToken);
        if (val) {
            return { token: val };
        }

        return null;
    }

    public setUserInfo( token: string): UserInfo {

        //let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
        let decodedJWT = jwt_decode(token);

        const  info:  UserInfo ={
            Name:decodedJWT["Name"],
            Roles:[],
        };
        var roles=decodedJWT["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (Array.isArray(roles))
          {
            roles.forEach(e => {
                info.Roles.push(JSON.parse( e));
                });
          }
        else
        info.Roles[0]=JSON.parse(roles);

         this.store.dispatch(UserInfoAction(info));
         this.appSetting.setItem<UserInfo>(AppKey.UserInfo, info);
         return info;
    }

    public getUserInfo<T>(): T {
        const data: T = this.appSetting.getItem<T>(AppKey.UserInfo);

        if (data) {
            this.store.dispatch(UserInfoAction(data));


        }

        return data;
    }

    public logout(): void {
        // this.appSetting.clear();

        this.appSetting.removeItem(AppKey.AccessToken);
        this.appSetting.removeItem(AppKey.RefreshToken);
        this.appSetting.removeItem(AppKey.UserInfo);
    }
}
