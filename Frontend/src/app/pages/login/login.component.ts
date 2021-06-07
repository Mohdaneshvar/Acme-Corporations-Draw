import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Route } from 'src/app/app-routing';
import { AddCardProgress, FormValidator, RemoveCardProgress, RequiredValidator,MobileValidator,NationalIdValidator, IsNumberValidator, AddCardLoading, RemoveCardLoading } from 'src/app/core/form.validator';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { DateTimeService } from 'src/app/core/services/datetime.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenAction, UserInfoAction } from 'src/app/core/store/action';
import { UserInfo } from 'src/app/shared/models/user-info';
import { CaptchaModel, Login1 } from './login.model';
import { LoginService } from './login.service';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { CaptchaComponent } from 'angular-captcha';
import { CaptchaService } from 'angular-captcha/src/captcha.service';
import { CaptchaHelperService } from 'angular-captcha/src/captcha-helper.service';
import { CaptchaEndpointPipe } from 'angular-captcha/src/captcha-endpoint.pipe';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AppRoute } from 'src/app/app-routing.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService,CaptchaComponent]
})
export class LoginComponent extends BaseService implements OnInit {


  private returnUrl: string;
  formLogin: FormGroup;

  captcha: CaptchaModel;

  showPassword: boolean = false;
   @ViewChild(CaptchaComponent, { static: true }) captchaComponent: CaptchaComponent;

  constructor(private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private authService: AuthService,
    private toastService: ToastService, public translateService: TranslateService,
    private dateTimeService: DateTimeService, private store: Store<UserInfo>, private loginService: LoginService,


    ) {

    super();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  ngOnInit(): void {
    this.captchaComponent.captchaEndpoint =  environment.captchaUrl+  'simple-captcha-endpoint.ashx';
    this.createForm();
  }
  public loginadmin() {
    this.router.navigate([Route.HOME_ADMIN_LOGIN]);
  }
  public login = (loginFormValue) => {
    const loginDto: Login1 = {
      userName: loginFormValue.userName,
      password: loginFormValue.password,
      userEnteredCaptchaCode:this.captchaComponent.userEnteredCaptchaCode,
      captchaId: this.captchaComponent.captchaId,
    };

    FormValidator(this.formLogin, 'formLogin', () => {
      const err: ValidationErrors = {};
      if ( this.captchaComponent.userEnteredCaptchaCode =="")
      err.captcha="Please enter captcha value.";
      return err;
    }).subscribe(
      () => {
        AddCardLoading('login', 'btn-primary');
        this.loginService.loginUser(loginDto)
        .subscribe(res => {
          RemoveCardLoading('login', 'btn-primary');
          this.authService.setAccessToken(res.token);
          const data= this.authService.setUserInfo(res.token);
          if (this.returnUrl)
          this.router.navigate([this.returnUrl]);
          else
          this.router.navigate([AppRoute.Home]);
        },error => {
          RemoveCardLoading('login', 'btn-primary');
          this.captchaComponent.reloadImage();
                });

      }, () => {

        this.captchaComponent.reloadImage();
      });





  }




  private createForm(): void {
    this.formLogin = this.formBuilder.group({
      userName: new FormControl('', [RequiredValidator('Please enter user name.')]),
      password: new FormControl('', [RequiredValidator('Please enter password')]),
    });
  }
}
