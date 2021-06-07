
export interface ApiResult<T> {
    data?: T;
    success?: boolean;
    loginRequired?:boolean;
    errors?:number[];
    listError?: string[];
    isFinalized?:boolean;
    message?:string;
    time?:number;
}
