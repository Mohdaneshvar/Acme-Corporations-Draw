import { element } from 'protractor';
import { filter } from 'rxjs/operators';
export function AutoFocus(index: number = 0): void {
  setTimeout(() => {
    if (index > 0) {
      let nodes = document.querySelectorAll('form#PropertyValue-form');
      let querySelector = nodes[nodes.length - 1];

      if (querySelector !== undefined) {
        let elements = querySelector.getElementsByTagName('textarea');
        const len = elements.length;

        for (let i = 0; i < len; i++) {
          if (elements[i].type !== 'hidden' && elements[i].type !== 'button' && elements[i].disabled == false) {
            elements[i].focus();
          }
        }
      }
    } else {
      let elements = document.getElementsByTagName('textarea');
      const len = elements.length;

      for (let i = 0; i < len; i++) {
        if (elements[i].type !== 'hidden' && elements[i].type !== 'button' && elements[i].disabled == false) {
          elements[i].focus();
          break;
        }
      }
    }
  }, 100);
}
