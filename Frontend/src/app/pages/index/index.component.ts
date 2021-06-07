import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppKey, AppSettingService } from 'src/app/core/app-setting';
import { BaseService } from 'src/app/core/services/base.service';
import { getUserInfoData } from 'src/app/core/store/selector';
import { AppSetting, Menu } from 'src/app/pages/home/home.model';
import { HomeService } from 'src/app/pages/home/home.service';
import { UserInfo } from 'src/app/shared/models/user-info';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [HomeService],
})
export class IndexComponent extends BaseService implements OnInit {
  env: any = environment;

  setting: AppSetting;

  userInfo: UserInfo;

  menuList: Menu[] = [];

  pageHistory: Menu[] = [];

  constructor(
    //private storage: StorageService,
    //private baseInfoService: BaseInfoService,
    private store: Store<any>,
    private homeService: HomeService,
    private appSettingService: AppSettingService
  ) {
    super();
  }

  ngOnInit(): void {
    //if (this.storage.getItem('expireTime') !== null) {
    //  this.storage.setItem('expireTime', '0');
    //}

    this.store.select<UserInfo>(getUserInfoData).subscribe((data) => {
      this.userInfo = data;
    });

    this.setting = this.appSettingService.getItem<AppSetting>(AppKey.Setting);

    this.menuList = this.homeService.getIndexShortcuts();

    this.pageHistory = this.homeService.getPageHistory();

  }


}



