import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appNext]'
})
export class NextDirective implements AfterViewInit {

    @Input() appNext: boolean = false;

    elementList: HTMLElement[] = [];

    constructor(private element: ElementRef) { }

    ngAfterViewInit(): void {
        this.element.nativeElement.querySelector('[tabindex="1"]').focus();

        this.elementList = this.getElements();
    }

    @HostListener('keyup', ['$event']) handleKeyUp(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            if (this.appNext) {
                this.elementList = this.getElements();
            }

            if (this.elementList && this.elementList.length > 0) {
                this.elementList = this.elementList.filter(x => +x.getAttribute('tabindex') > 0);

                const currentTabIndex: number = +(document.activeElement as HTMLInputElement).getAttribute('tabindex');

                let nextIndex: number = 0;
                for (let i: number = 0; i < this.elementList.length; i++) {
                    const tabIndex: number = +this.elementList[i].getAttribute('tabindex');
                    if (tabIndex && tabIndex === currentTabIndex) {
                        nextIndex = i + 1;
                    }
                }
                if (nextIndex < this.elementList.length) {
                    this.elementList[nextIndex].focus();
                }
            }
        }
    }

    private getElements(): HTMLElement[] {
        return Array.from(this.element.nativeElement.querySelectorAll('[tabindex]') as any);
    }
}
