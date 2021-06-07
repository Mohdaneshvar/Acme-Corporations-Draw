import { createSelector } from '@ngrx/store';
import { Token } from 'src/app/shared/models/token';
import { UserInfo } from 'src/app/shared/models/user-info';
import { StoreData } from '.';

const getToken: any = (state: { token: string }): { token: string } => state;
const getUserInfo: any = (state: UserInfo): UserInfo => state;
const getTemp: any = (state: any): any => state;

export const getTokenData: any = createSelector(getToken, (state: StoreData<Token>) => state.tokenState);
export const getUserInfoData: any = createSelector(getUserInfo, (state: StoreData<UserInfo>) => state.userInfoState);
export const getTempDataData: any = createSelector(getTemp, (state: StoreData<any>) => state.tempState);
