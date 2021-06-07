import { KeyValue } from '@angular/common';
import { UserInfo } from 'src/app/shared/models/user-info';

export interface Menu {
    id?: number;
    roles?: number[];
    route: string;
    params?: any;
    title: string;
    desc?: string;
    icon?: string;
    expand?: boolean;
    subMenu?: Menu[];
    shortcut?: number;
    sidebar?: boolean;
    active?: boolean;
}

export interface HomeData {
    setting: AppSetting;
    userInfo: UserInfo;
    version: string;
    today: string;
    roleUserId: number;
    sideBarExpanded: boolean;
    sideBarFixed: boolean;
    showScrollToTop: boolean;
    fullScreen: boolean;
    isActiveHelp:boolean;
    isHomePage: boolean;
    isStatusPage : boolean;
    navBarList: NavbarIcon[];
    breadcrumbList: KeyValue<string, string>[];
    colorList: KeyValue<number, string>[];
}

export class AppSetting {
    theme: string;
    sidebar: string;
    history: boolean;
    fullscreen: boolean;
}

export interface NavbarIcon {
    name: string;
    title: string;
    icon: string;
    badge?: number;
}
