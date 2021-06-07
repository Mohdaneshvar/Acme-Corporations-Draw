
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as Driver from 'driver.js';
import { MessageService, MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { Route } from 'src/app/app-routing';
import { RouteBase } from 'src/app/app-routing.enum';
import { AppKey, AppSettingService } from 'src/app/core/app-setting';
import { AddCardLoading, RemoveCardLoading } from 'src/app/core/form.validator';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { DateTimeService } from 'src/app/core/services/datetime.service';
import { getUserInfoData } from 'src/app/core/store/selector';
import { UserInfo } from 'src/app/shared/models/user-info';
import { environment } from 'src/environments/environment';
import { AppNabBarList, AppThemeList } from './home.const';
import { AppSetting, HomeData, Menu, NavbarIcon } from './home.model';
import { HomeService } from './home.service';
import { Subscription, timer } from 'rxjs';

declare var window: any;

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService],
})
export class HomeComponent
  extends BaseService
  
  implements OnInit {
  menu: Menu[];
  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<any>,
    private title: Title,
    private translateService: TranslateService,
    private authService: AuthService,
    private dateTimeService: DateTimeService,
    private appSettingService: AppSettingService,
    public homeService: HomeService,
    private messageService: MessageService
  ) {
    super();
  }
  userIsLogin:boolean;

  ngOnInit(): void {
    this.authService.checkIsLogin().subscribe(res=>{
      this.userIsLogin= res;
    });
    this.menu = this.homeService.getMenu();
  }

  logout(): void {
      this.authService.logout();
        this.router.navigate([RouteBase.Login]).then(() => {
          
        });
  }
  login(): void {
      this.router.navigate([RouteBase.Login]).then(() => {
        
      });
}

  scrollToTop(): void {
    $('html').animate({ scrollTop: 0 }, 500, () => { });
  }



  
  private startGuide(event: MouseEvent): void {
    event.stopPropagation();

    let key: string = window.guideKey;
    if (key === '') {
      key = this.router.url.substr(1).split('?')[0];
    }

    this.translateService.get([key]).subscribe((data) => {
      if (typeof data[key] === 'object') {
        const list: { title: string; description: string } = data[key];
        const result: any = Object.keys(list).map((val) => {
          return {
            element: val,
            popover: {
              title: list[val].title,
              description: list[val].description,
            },
          };
        });
        const driver: any = new Driver({
          keyboardControl: true,
          allowClose: false,
          className: 'driver-popover-custom',
          nextBtnText: 'بعدی',
          prevBtnText: 'قبلی',
          doneBtnText: 'پایان',
          closeBtnText: 'بستن',
        });
        driver.defineSteps(result);

        driver.start();
      } else {
        // this.toastService.message(MessageType.Warning, 'راهنما برای این صفحه وجود ندارد', 'راهنما');
      }
    });
  }


  private refreshPage(): void {
    this.router
      .navigate(['/' + RouteBase.Home], { skipLocationChange: true })
      .then(() => {
        this.router.navigate([Route.HOME_INDEX]);
      });
  }

  home() {
    this.router.navigate([Route.HOME_INDEX]);
  }

  onConfirm() {
    this.messageService.clear('delete');
    this.router.navigate([Route.HOME_INDEX]);
    //this.storage.clear();
    RemoveCardLoading('card-info', 'btn-primary');
  }

  onReject() {
    this.messageService.clear('delete');
    RemoveCardLoading('card-info', 'btn-primary');
  }


}
