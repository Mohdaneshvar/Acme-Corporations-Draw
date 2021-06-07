import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR  } from '@angular/forms';
import { DateTimeService } from 'src/app/core/services/datetime.service';
import { IdTitle } from 'src/app/shared/models/id-title';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: { provide, useExisting, multi } = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDatePickerComponent),
    multi: true
};

@Component({
    selector: 'app-input-date-picker',
    templateUrl: './input-date-picker.component.html',
    styleUrls: ['./input-date-picker.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputDatePickerComponent implements OnInit {

    year: number;
    month: number = 0;
    day: number = 0;

    monthList: IdTitle[] = [];
    dayList: IdTitle[] = [];

    isDisabled: boolean = false;

    value: string;

    @Output() OnSelect: EventEmitter<string> = new EventEmitter<string>();

    constructor(private dateTimeService: DateTimeService) { }

    ngOnInit(): void {
        this.monthList = [
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
            { Id: 12, Title: 'اسفند' },
        ];

        for (let i: number = 1; i <= 31; i++) {
            this.dayList.push({ Id: i, Title: i.toString() });
        }
    }

    changeValue(): void {
        if (this.year && this.month && this.day && this.year.toString().length === 4 && this.year < 2000) {
            this.value = this.dateTimeService.toGregorian(`${this.year}/${this.month}/${this.day}`);

            this.OnSelect.emit(this.value);
            this.onChange(this.value);
        }
    }

    fixYear(): void {
        if (this.year && this.year.toString().length === 2) {
            const y: number = +this.dateTimeService.getPersianDate('jYYYY').substr(0, 2);
            this.year = +`${y}${this.year}`;
        }

        this.changeValue();
    }

    writeValue(value: string): void {
        if (value && this.dateTimeService.dateIsValid(value)) {
            const valueFa: string = this.dateTimeService.toPersian(value);
            if (valueFa) {
                this.year = Number(valueFa.substr(0, 4));
                this.month = Number(valueFa.substr(5, 2));
                this.day = Number(valueFa.substr(8, 2));
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
