import { createAction, props } from '@ngrx/store';
import { Token } from 'src/app/shared/models/token';
import { UserInfo } from 'src/app/shared/models/user-info';

const TOKEN: string = '[Auth Token] Auth Token';
const USER_INFO: string = '[User Info] User Info';
const TEMP_DATA: string = '[Temp Data] Any Data';

export const TokenAction: any = createAction(TOKEN, props<{ data: Token }>());
export const UserInfoAction: any = createAction(USER_INFO, props<{ data: UserInfo }>());

export const TempDataAction: any = createAction(TEMP_DATA, props<{ data: any }>());
