import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nationalCodeFormat' })
export class NationalCodePipe implements PipeTransform {

    constructor() { }

    transform(value: string, ...args: string[]): string {
        const len:number=value.toString().length;
        if (typeof value === 'undefined' || value === null || value === ''|| len<=0) {
            return '';
        } else if(len>=10){
            return value;
        }
        else{
            return  new Array(11-len).join("0") + value ;
        }
    }
}
