import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../app/core/services/base.service'
import { CreateSerialNumber } from '../serial-numbers/serial-numbers.model'

@Injectable({
  providedIn: 'root'
})
export class SerialNumberService extends BaseService {

    constructor() {
        super();
    }
    public createSerialNumber(model:CreateSerialNumber): Observable<any> {
      return  super.get<any>('api/CreateSerialNumberCommand','blob',model);
    }
   
}
