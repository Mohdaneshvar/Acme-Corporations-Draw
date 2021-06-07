import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UserInfo } from 'src/app/shared/models/user-info';
import { TempDataAction, TokenAction, UserInfoAction } from './action';

export interface RootState {
    token: string;
    userInfo: UserInfo;
    tempData: any;
}

const initialState: RootState = {
    token: null,
    userInfo: null,
    tempData: null
};

export const tokenReducer: ActionReducer<RootState, Action> = createReducer(initialState, on(TokenAction, (state, action) => action));
export const userInfoReducer: ActionReducer<RootState, Action> = createReducer(initialState, on(UserInfoAction, (state, action) => action));
export const tempReducer: ActionReducer<RootState, Action> = createReducer(initialState, on(TempDataAction, (state, action) => action));
