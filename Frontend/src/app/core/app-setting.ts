import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import * as MD5 from 'js-md5';
import { environment } from 'src/environments/environment';
import { RouteBase } from '../app-routing.enum';

export enum AppKey {
    RefreshToken = 'refresh_token',
    AccessToken = 'access_token',
    UserInfo = 'user_info',
    History = 'history',
    Setting = 'setting'
}

@Injectable({ providedIn: 'root' })
export class AppSettingService {

    private storage: Storage;

    private appHashKey: string;

    constructor(private router: Router) {
      this.storage = window.sessionStorage;//window.localStorage;

        this.appHashKey = MD5(environment.name);
    }

    public setItem<T>(key: AppKey, value: T): void {
        this.storage.setItem(this.getKeyName(key), this.encrypt(JSON.stringify(value)));
    }

    public getItem<T>(key: AppKey): T {
        try {
            const data: string = this.storage.getItem(this.getKeyName(key));
            if (data) {
                return JSON.parse(this.decrypt(data)) as T;
            }

            return null;
        } catch (e) {
            this.removeItem(AppKey.AccessToken);
            this.removeItem(AppKey.UserInfo);

            this.router.navigate([RouteBase.Login]);
        }
    }

    public removeItem(key: AppKey): void {
        this.storage.removeItem(this.getKeyName(key));
    }

    public clear(): void {
        this.storage.clear();
    }

    private encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, this.appHashKey).toString();
    }

    private decrypt(ciphertext: string): string {
        const bytes: any = CryptoJS.AES.decrypt(ciphertext, this.appHashKey);

        return bytes.toString(CryptoJS.enc.Utf8);
    }

    private getKeyName(key: AppKey): string {
        return MD5(`${this.appHashKey}${key}`);
    }
}
