import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {

    private messageLife: number = 3000;

    constructor(private messageService: MessageService, private translateService: TranslateService) { }

    public add(severity_: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string | string[]): void {
        detail = this.getMessages(detail);

        this.translateService.get([summary, ...detail]).subscribe(
            values => {
                const keys: string[] = Object.keys(values).map(
                    val => {
                        return values[val];
                    }
                );
                const title = keys[0];
                keys.splice(0, 1);

                for (const msg of keys) {
                    this.messageService.add({ severity: severity_, summary: title, detail: msg, life: this.messageLife });
                }
            }
        );
    }

    public showServerError(errs: number[]): void {
        for (const err of errs) {
            this.add('error', `ServerError.${err.toString()}`, 'خطا');
        }
    }

    public clear(): void {
        this.messageService.clear();
    }

    private getMessages(messages: any): Array<string> {
        let result: string[] = new Array<string>();

        if (typeof messages === 'string') {
            result.push(messages);
        } else {
            result = messages;
        }

        return result;
    }
}
