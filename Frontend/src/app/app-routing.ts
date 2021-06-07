import {  RouteBase,AppRoute } from './app-routing.enum';

export class Route {
    static readonly HOME_INDEX: string = `/${RouteBase.Home}/${RouteBase.Index}`;
    static readonly HOME_ADMIN_INDEX: string = `/${RouteBase.AdminHome}/${RouteBase.AdminIndex}`;
    static readonly HOME_ADMIN_LOGIN: string = `/${RouteBase.LoginAdmin}`;
    static readonly Participants_Register: string = `/${AppRoute.RegisterParticipant}`;
    static readonly Participant_List: string = `/${AppRoute.ParticipantList}`;
    static readonly Create_Serial_Number: string = `/${AppRoute.CreateSerialNumber}`;

}


