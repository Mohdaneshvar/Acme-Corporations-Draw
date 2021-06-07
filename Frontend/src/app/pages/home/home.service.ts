import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppKey, AppSettingService } from 'src/app/core/app-setting';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { Sort, SortOrder } from 'src/app/shared/functions/sort';
import { ApiResult } from 'src/app/shared/models/api-result';
import { UserInfo } from 'src/app/shared/models/user-info';
import { AppMenu } from './home.const';
import { AppSetting, Menu } from './home.model';

@Injectable()
export class HomeService extends BaseService {

  constructor(private authService: AuthService, private appSettingService: AppSettingService) { super(); }
  public MainNavbar: number = 0;
  public Circumference: number = 22 * 2 * Math.PI;


  public FamilyStrokeDashoffset: number = 0;



  public getMenu(): Menu[] {
    var userRoles: number[] = this.authService.getUserInfo<UserInfo>()?.Roles ;

    const temp: Menu[] = JSON.parse(JSON.stringify(AppMenu));

    const menu: Menu[] = temp.reduce((previousMenu, currentMenu) => {
      currentMenu.active = false;
      let subMenu: Menu[] = [];
      if (currentMenu.subMenu) {
        subMenu = currentMenu.subMenu.reduce((previousValue, currentValue) => {
          currentValue.active = false;

          if (currentValue.roles) {
            for (const role of currentValue.roles) {
              if (userRoles?.indexOf(role) > -1) {
                previousValue.push(currentValue);
              }
            }
          } else {
            previousValue.push(currentValue);
          }

          return previousValue;
        }, []);
      }

      if (subMenu.length > 0) {
        const newMenu: Menu = currentMenu;
        newMenu.subMenu = subMenu;

        previousMenu.push(newMenu);
      }

      return previousMenu;
    }, []);

    return menu;
  }

  public getIndexShortcuts(): Menu[] {
    const temp: Menu[] = [];

    for (const tmp of this.getMenu()) {
      const nav: Menu[] = tmp.subMenu.reduce((previousValue, currentValue) => {
        if (currentValue.shortcut) {
          previousValue.push(currentValue);
        }

        return previousValue;
      }, []);

      temp.push(...nav);
    }

    return Sort<Menu>(temp, 'shortcut', SortOrder.ASC);
  }

  public setPageHistory(id: number): void {
    let keys: KeyValue<number, number>[] = this.appSettingService.getItem<KeyValue<number, number>[]>(AppKey.History);

    if (keys) {
      const key: KeyValue<number, number> = keys.find(x => x.key === id);
      if (key) {
        key.value = key.value + 1;
      } else {
        keys.push({ key: id, value: 1 });
      }
    } else {
      keys = [];
      keys.push({ key: id, value: 1 });
    }

    this.appSettingService.setItem<KeyValue<number, number>[]>(AppKey.History, keys);
  }

  public getPageHistory(): Menu[] {
    let history: KeyValue<number, number>[] = this.appSettingService.getItem<KeyValue<number, number>[]>(AppKey.History);
    if (history) {
      history = Sort<KeyValue<number, number>>(history, 'value', SortOrder.DESC);
      const temp: KeyValue<number, Menu>[] = [];

      const menu: Menu[] = this.getMenu();

      for (const nav of menu) {
        for (const subNav of nav.subMenu) {
          const find: KeyValue<number, number> = history.find(x => x.key === subNav.id);
          if (find) {
            temp.push({
              key: find.value,
              value: {
                id: subNav.id,
                route: `${nav.route}${subNav.route}`,
                params: subNav.params,
                title: subNav.title,
                icon: subNav.icon,
              }
            });
          }
        }
      }

      return Sort<KeyValue<number, Menu>>(temp, 'key', SortOrder.DESC).map(x => x.value).splice(0, 3);
    }

    return null;
  }

  public getAppSetting(): AppSetting {
    let setting: AppSetting = this.appSettingService.getItem<AppSetting>(AppKey.Setting);
    if (!setting) {
      setting = {
        theme: 'theme1',
        sidebar: 'float',
        history: false,
        fullscreen: false
      };
      this.appSettingService.setItem<AppSetting>(AppKey.Setting, setting);
    }

    return setting;
  }


}
