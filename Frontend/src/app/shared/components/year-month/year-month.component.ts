import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimeService } from 'src/app/core/services/datetime.service';
import { IdTitle } from 'src/app/shared/models/id-title';

const CUSTOM_INPUT_ACCESSOR: { provide, useExisting, multi } = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YearMonthComponent),
    multi: true
};

@Component({
  selector: 'app-year-month',
  templateUrl: './year-month.component.html',
  styleUrls: ['./year-month.component.scss'],
  providers: [CUSTOM_INPUT_ACCESSOR]
})
export class YearMonthComponent implements OnInit {

  year: number;
    month: number = 0;

    monthList: IdTitle[] = [];
    dayList: IdTitle[] = [];

    isDisabled: boolean = false;

    value: string;


    @Output() OnSelect: EventEmitter<string> = new EventEmitter<string>();

    constructor(private dateTimeService: DateTimeService) { }

    ngOnInit(): void {
        this.monthList = [
            { Id: null, Title: 'انتخاب کنید' },
            { Id: 1, Title: 'فروردین' },
            { Id: 2, Title: 'اردیبهشت' },
            { Id: 3, Title: 'خرداد' },
            { Id: 4, Title: 'تیر' },
            { Id: 5, Title: 'مرداد' },
            { Id: 6, Title: 'شهریور' },
            { Id: 7, Title: 'مهر' },
            { Id: 8, Title: 'آبان' },
            { Id: 9, Title: 'آذر' },
            { Id: 10, Title: 'دی' },
            { Id: 11, Title: 'بهمن' },
            { Id: 12, Title: 'اسفند' }
        ];
    }

    changeValue(): void {

        if (this.year && this.month && this.year.toString().length === 4 && this.year < 2000) {
            this.value = this.month + '/' + this.year;
            this.OnSelect.emit(this.value);
            this.onChange(this.value);
        }
    }

    fixYear(): void {

        if (this.year && this.year.toString().length === 2) {
            this.year = this.year;
        }
        this.changeValue();
    }

    writeValue(value: string): void {

        if (value) {
            let valueFa = value.split('/');
            if (valueFa) {
                this.year = +valueFa[1];
                this.month = +valueFa[0];
            }

            this.OnSelect.emit(value);
            this.onChange(value);
        } else {
            this.OnSelect.emit(null);
            this.onChange(null);
        }
    }

    onChange = (_: any) => { };
    onTouched = () => { };
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

}
