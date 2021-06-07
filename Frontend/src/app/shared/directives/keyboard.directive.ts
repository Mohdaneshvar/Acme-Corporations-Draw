import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Directive({
    selector: '[appKeyboard]'
})
export class KeyboardDirective implements OnInit {

    @Input() appKeyboard: string;

    constructor(private element: ElementRef, private translateService: TranslateService) { }

    ngOnInit(): void {
        this.translateService.get(this.appKeyboard.split(',')).subscribe(
            data => {
                const arr: string[] = Object.keys(data).map(
                    val => {
                        return val;
                    }
                );

                let keyboardId: string = '';
                let keyboardType: string = '';

                if (arr.length === 1) {
                    keyboardId = data[arr[0]];
                    keyboardType = 'alpha';
                } else if (arr.length === 2) {
                    keyboardId = data[arr[0]];
                    keyboardType = data[arr[1]];
                }

                const numberLayout: object = {
                    normal: [
                        '1 2 3',
                        '4 5 6',
                        '7 8 9',
                        '  0  ',
                        '{bksp}'
                    ]
                };

                $(`.${keyboardId} input`).keyboard(
                    {
                        // layout: 'alpha', // Alphabetical layout.
                        // layout: 'numpad', // Numerical layout with left & right caret keys (added by extender extension).
                        // layout: 'custom', // Uses a custom layout as defined by the customLayout option.
                        // layout: 'num', // Numerical (ten-key) layout.
                        layout: keyboardType,
                        customLayout: keyboardType === 'number' ? numberLayout : '',
                        autoAccept: true,
                        usePreview: false,
                        stayOpen: false,
                        openOn: null,
                        css: {
                            input: 'ui-widget-content ui-corner-all',
                            container: 'shadow p-3 mb-5 bg-white rounded',
                            buttonDefault: 'btn btn-light',
                        },
                        display: {
                            accept: 'تایید:Accept (Shift-Enter)',
                            bksp: 'پاک کردن:Backspace',
                            cancel: 'بستن:Cancel (Esc)',
                            space: 'فاصله:Space',
                        },
                        appendTo: `.${this.appKeyboard}`,
                    }
                );

                $(this.element.nativeElement).click(function () {
                    $(this).parent().find('input').getkeyboard().reveal();
                });
            });

    }
}
