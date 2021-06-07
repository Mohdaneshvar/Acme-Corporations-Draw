import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { ApiResult } from 'src/app/shared/models/api-result';
import { Token } from 'src/app/shared/models/token';
import { UserInfo } from 'src/app/shared/models/user-info';
import { CaptchaModel, Login1 } from './login.model';
import { AuthResponse } from '../../shared/models/auth-response';
@Injectable()
export class LoginService extends BaseService {

    constructor() {
        super();
    }

    public loginUser(model: Login1): Observable<AuthResponse> {
        return new Observable<AuthResponse>(observer => {
            super.post<Login1, AuthResponse>('Api/Account/Login', model, 'json').subscribe(
                response => {
                    console.log('Login: ', response);
                    observer.next(response);
                }
           ,error=>{
            observer.error(error);
           } );
        });
    }


    // public loginAdmin(model: LoginAdmin): Observable<AuthResponseDto> {
    //     return new Observable<AuthResponseDto>(observer => {
    //         super.post<LoginAdmin, AuthResponseDto>('Api/Account/LoginAdmin', model, 'json').subscribe(
    //             response => {
    //                 console.log('Login: ', response);
    //                 observer.next(response);
    //             }
    //       ,error=>
    //       {
    //         observer.error(error);
    //       }
    //             );
    //     });
    // }
    public getRefreshToken(model: Login1): Observable<string> {
        return new Observable<string>(observer => {
            super.post<Login1, string>('Api/Login/Refreshtoken', model, 'json').subscribe(
                response => {
                    console.log('refresh: ', response);
                    observer.next(response);
                }
            );
        });
    }

    public getAccessToken(refreshToken: string): Observable<string> {
        return new Observable<string>(observer => {
            super.post<Token, string>('Api/Login/AccessToken', { token: refreshToken }, 'json').subscribe(
                response => {
                    console.log('token: ', response);
                    observer.next(response);
                }
            );
        });
    }

    public getId(): Observable<string> {
        return new Observable<string>(observer => {
            super.get<any>('Api/Login/getid', 'json').subscribe(
                response => {
                    console.log('id: ', response);
                    observer.next(response);
                }
            );
        });
    }

    // public getCaptcha(): Observable<CaptchaModel> {
    //     return new Observable<CaptchaModel>(observer => {
    //         const captcha1: CaptchaModel = {
    //             Key: '+jrJSLRHXAjKBV/rwsBiHQ==', Image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAwCAYAAADn/d+1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOzSURBVHhe7ZlBS9xAFMd798P4NYoH/QZ+g16WVj9Apd1iYQ/SQ0sXFMSbdBEWe9jDHhRXkbLUS9EFBUH04F705OV1ksybTGZnMpPsJJmJ+cH/sDFb4f18703SN9DgFI0Qx2iEOEYjpEBeXv6GyUIjpADyiEAaIRaZRwTSCLGADRFII2QObIpAGiE5KEIEUrqQ/X93LL5RpAik0g7h5fBxjTJEIE6OLKuSLtfg96eFRI5ObugP0ylTBOLNDsku6QYm3aSIRLpdeKJ3ilQhAvF6qcskBQm4P8DiL8HkMbwU8diFIypF7JQ8Io63lmFxZQUWl1uwZ2HamgmZvAf4Sm41yluAKf2eMVdwONiEjiwXV/Qec1SSGDjGaJfk7YjbXiuSUR8hKSKEHD7QrxjwdLIUFfxgSK/IJeUVEXLXg9Vl0h2tHuwFXfLahHQG23D2TL+WSrw7xpf0kgAvQiZKzx3stQIJW3BMPoVjqzIhE3rNClSIaiw99JNSjMbXEMbhjsDdgZ8XmAjdKUsnCUfVxnn0uUZCDOCljEYGzYcC1uCe7goUEY4xTMopSwaT86sdylj6MWaiXpWQ9fa3eKxlEhKLSBSeey4xfR6JOYcNujdu6ZVAypePgZB38OFotpuy4rwQeB7BJhWye22ynIZxR6i6gEkhXUQvmaDqBPE66yYupjgvZHJBu2PQ0f5qFIEdou4Acc+YQLsDj7kpWe3NCpBJCiKSXYgsOz/pjTaZwtkIZUQnrPX2d/qzJCgiQn/KqkKIClEOqaYBOiGY06wzWUA8VZGIY4qXkhQRg0/pdjtETbVLXZd5RppESBhhmatEMDQ7gj04ZjxpqahICIkMUdY840slJMx2QoRqfEXwLxaTUpgMEvVIy0b5QnRMiQQmJc+7LAXkhLXLSxE6JV1KfPyVhnut4hJ2hAT0UQiJ1ZMY/3qlP/NPp0tJdkQUO3ujKDwQMnvaEtFJ8QlLQshpZgeFWBxZIXohAXWRYkdIYrErln9eEot+dmTx1EGKXggWW/WMcUo6gslIuU9C9BSu/qufXm9zMsxenfguxVyISTIeeePXIiZJ7w6kEcKSfVSZCzGTgfgshVTSEHE0scy/xMXRFMf0fwln8VUKqWh98VFKbYV8/vPC4hO1EcILECX41CleChGLLwqQ4YsU54XkKb4KH6Q4J8RW8VW4LqVSIWLxixAgw2UppQqpovgqXJVSmBCx+FULkOGiFCtCfCi+Ctek5BLia/F9wFhII6AcSl3qDToA/gNSCRADNtGoHAAAAABJRU5ErkJggg=='
    //         };

    //         const captcha2: CaptchaModel = {
    //             Key: 'lUHADSShkHfyGgovjjt3AA==', Image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAwCAYAAADn/d+1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOnSURBVHhe7Zi/auMwGMDzKPc4fpdb/Q4XyNIHyBDodnDLgbmlR5YO7nIU2uEghWYqbYcspcstuijWJ32SJVmSJVsJ+sEHru228P3y/VEWpJAVzkJ+/H1hV3H48vM7uypgvCqkSEnPrEIoRYqM9wwpVZKWoKFepKQjSAilSElDNkIoRcoIIZQiJT6jhFBK64pLdkIolyrl259/7MqMo5AH8vjrK/mN4/aGfLKn+UrZkmaxICsc1Zoc2NNx7Ei9WpEFjk1L9uwphopwkUEZFvJ6LYtQ4vG1ey2FlFFsa1mEEs2WvRfAvt3IIpSod917PiKAASGoMu4f2D3KG3m+BSnX5P14Jy8hqDJqnPk9aSuQUh8/4wEcWlJB8pWK2Dbd/RARgFXI59OySzpqTwIhK1WV8P9PQ/pA2Dmsqy7p2vYkZIVUCSTd1p5Oz5sg3XYh7/ddMu6e3tgdjKgS/DyaFLVVegjZ1V3CN2tdykSV6J/bEHMD2hLAq4JXUHNU74/jUNfRrxBgtBTd3PIQYmdMhYCQDVmz0uu3p/47PgQKQbNF085GCfm4IXf8by/FdRQhaLYEbVuiQvoiGGjGqFXkgpcQaGE8LEkKkiLJOIrGP48QAi2MhzTo/QARphmBN7DEQvBmhSKaFE3VRRGCN6txUk4VsWt4wlUp6jqcvEIkcJ83JMtdCJLB1ugTkSpEAp9PHKWo7cl2DqnaHVlvuutphVC4FJREhWEp/TMNJ4UQCpdiP4uoIiTweeQUMMQPTMikQx2AT/aSPH+wWxrMUrAMzd9IJYQP94q0ms3XKmKIdGuvea0VjBMilgTD7wcJcVlrzUKCRTB4OzMcHIewVghPmCEZ4iRtblmAKgWfwo3CAyuEb1WGGcFP8qhluVYFnNSrVtePxFqsfz6MvWVZBjdOqP4k3wdLkb4W8Qp7NZ6wDG4hozupe7cntGXJQ1vICK0OyuAMGUycZ28HKUmFHMGJ14W3CAT/PksbYcMccBzqeC2FGG5TOqYS0oFO5hFESODzCETgF4oYRyFxMQ35HpG3rCgiEjOLEIqTlEhColXFBFy0kHMSAcwmhDIoJVDIOYoAZhVCsUoJEAIirg5Xpzg3LkaIqSrOTczsQihGKQ5CXNvTuYjJQgjFacgjXEWo5C4lGyEUFymhIjA5V8tZCRkrQiVHMVkJofi2rhjkJCY7IXOSg5giRMOcUooQA3NVSxEywNRiihBHphJThHiSWkoRkhlFSGYUIVlByH/pqChoi7a9VQAAAABJRU5ErkJggg=='
    //         };

    //         const response: ApiResult<CaptchaModel> = {
    //             data: (Math.random() > 0.5) ? captcha1 : captcha2,
    //             success: true,
    //             errors: []
    //         };

    //         observer.next(response.data);

    //         // super.get<ApiResult<Captcha>>('Api/Authentication/GetCaptcha?t=' + new Date().getTime(), 'json').subscribe(response => { });
    //     });
    // }


  sendCaptcha(model: Object): Observable<any> {
    return new Observable<boolean>(observer => {
        super.post<Object,boolean>('Api/Login/getid',model, 'json').subscribe(
            response => {
                console.log('id: ', response);
                observer.next(response);
            }
        );
    });
  }





    // public getUserInfo(): Observable<UserInfo> {
    //     return new Observable<UserInfo>(observer => {
    //         const response: ApiResult<UserInfo> = {
    //             data: {
    //                 UserName: 'admin',
    //                 name: 'کاربر',
    //                 family: 'سیستم',
    //                 loginDate: '2020/07/11 10:15:30 AM',
    //                 roles: [100]
    //             },
    //             success: true,
    //             errors: []
    //         };

    //         observer.next(response.data);
    //     });
    // }
}
