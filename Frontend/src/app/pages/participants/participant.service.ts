import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { Participant, RegisterParticipant } from './participant.model';
import{IPagedList} from '../../shared/models/IPagedList'
@Injectable({
  providedIn: 'root'
})
export class ParticipantService extends BaseService {

    constructor() {
        super();
    }
    // public getBaseInformation(): Observable<BaseInformation> {
    //   return super.get<BaseInformation>('api/admin/GetCurrentUserInfoCommand', 'json');
    // }
    public registerParticipant(model:RegisterParticipant): Observable<null> {
      return  super.post<RegisterParticipant,null>('api/RegistrerParticipantCommand',model, 'json');
    }
    public getAllParticipant(take: number, skip: number):Observable<IPagedList<Participant>>{
    return super.get<IPagedList<Participant>>(`api/getAllParticipantQuery?Skip=${skip}&PageSize=${take}`, 'json');
    }
}
