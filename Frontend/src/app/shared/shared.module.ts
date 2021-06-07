import { YearMonthComponent } from './components/year-month/year-month.component';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultipleTranslateLoaderFactory } from 'src/app/core/translate.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { KeyboardDirective } from './directives/keyboard.directive';
import { NextDirective } from './directives/next.directive';
import { NumericDirective } from './directives/numeric.directive';
import { DateTimeFormatPipe } from './pipes/date-format.pipe';
import { NationalCodePipe } from './pipes/national-code.pipe';
import { PrimeNgModule } from './primeng.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    NumericDirective,
    KeyboardDirective,
    NextDirective,
    SafeHtmlPipe,
    DateTimeFormatPipe,
    NationalCodePipe,
    DatePickerComponent,
    YearMonthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateHttpLoader,
        useFactory: MultipleTranslateLoaderFactory,
        deps: [HttpClient, TranslateService],
      },
      isolate: false,
    }),
    NgPersianDatepickerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    PrimeNgModule,
    TableModule,
    NumericDirective,
    KeyboardDirective,
    NextDirective,

    DateTimeFormatPipe,
    NationalCodePipe,
    DatePickerComponent,
    YearMonthComponent,
    SafeHtmlPipe,
    NgPersianDatepickerModule
  ],
  providers: [],
})
export class SharedModule { }
