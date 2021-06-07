import * as moment from 'moment-jalaali';

export function ConvertToMildai(date: Date): Date {  
    return moment.utc(date.toString(), 'jYYYY-jMM-jDD').toDate();
}  

export function ConvertToShamsi(date: Date): Date {  
    moment.loadPersian({ dialect: 'persian-modern' });
    return moment(date, 'YYYY-MM-DDTHH:mm:ss').toDate();
}  