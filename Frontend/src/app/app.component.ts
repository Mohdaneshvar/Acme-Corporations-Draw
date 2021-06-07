import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Route } from './app-routing';
import { AppSettingService } from './core/app-setting';
import { AuthService } from './core/services/auth.service';
import { UserInfoAction } from './core/store/action';
import { UserInfo } from './shared/models/user-info';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService, private translateService: TranslateService,
    private store: Store<any>, private appSettingService: AppSettingService) { }
  //@ViewChild(RouterOutlet) outlet: RouterOutlet;
  ngOnInit(): void {
    // const userInfo: any = {
    //   name: 'مدیر',
    //   family: 'سامانه',
    //   roleTitle: 'role',
    //   loginDate: '2020-01-01',
    //   roles: [100],
    //   username: 'admin'
    // };
    // this.authService.setUserInfo<UserInfo>(userInfo);
    // this.store.dispatch(UserInfoAction(userInfo));

    this.initTranslate();

    this.setDefaultLang('fa');

    this.router.events.subscribe(
      event => {
        // if (event instanceof ActivationStart)
        //   console.log(event.snapshot.outlet);
        //if (event instanceof ActivationStart && event.snapshot.outlet === "primary")
        //  this.outlet.deactivate();
        if (event instanceof NavigationStart) {
          window.setGuide('');
          if (event.url === '/') {
            this.router.navigate([Route.HOME_INDEX]);
          }
        }
      }
    );

    document.getElementsByClassName('index-loading-container')[0].remove();
  }

  private initTranslate(): void {
    this.translateService.addLangs(['fa']);
  }

  private setDefaultLang(defaultLang: 'fa'): void {
    this.translateService.setDefaultLang(defaultLang);
  }


}
