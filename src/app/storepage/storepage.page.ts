import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storepage',
  templateUrl: './storepage.page.html',
  styleUrls: ['./storepage.page.scss'],
})
export class StorepagePage implements OnInit {
  active1=true;
  active2=false;
  constructor() { }

  ngOnInit() {
  }

}
