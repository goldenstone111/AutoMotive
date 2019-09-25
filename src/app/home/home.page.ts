import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  // moveFocus(event, nextElement, previousElement) {
  //   if (event.keyCode == 8 && previousElement) {
  //     previousElement.setFocus();
  //   } else if (event.keyCode >= 48 && event.keyCode <= 57) {
  //     if (nextElement) {
  //       nextElement.setFocus();
  //     }
  //   } else {
  //     event.path[0].value = '';
  //   }

  // }
}
