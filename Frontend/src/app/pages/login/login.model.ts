export interface CaptchaModel {
    userEnteredCaptchaCode: string;
    captchaId: string;
}

export interface Login1 extends CaptchaModel {
    userName: string;
    password: string;
}
