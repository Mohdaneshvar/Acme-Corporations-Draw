import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TempDataAction } from './store/action';
import { getTempDataData } from './store/selector';

@Injectable({ providedIn: 'root' })
export class AppStoreService {

    constructor(private store: Store<any>) { }

    public setItem<T>(data: any): void {
        this.store.dispatch(TempDataAction({ Data: data }));
    }

    public getItem<T>(): Observable<T> {
        return new Observable<T>(observer => {
            this.store.select<any>(getTempDataData).subscribe(
                x => {
                    observer.next(x.Data);
                }
            );
        });
    }
}
