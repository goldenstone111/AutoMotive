import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicals',
  templateUrl: './vehicals.page.html',
  styleUrls: ['./vehicals.page.scss'],
})
export class VehicalsPage implements OnInit {
  vehicaldata:any=[
    {
      nickname : 'personal',
      make : 'Maruti',
      license : 'ERS 8579',
      modelnumber :'AMT ZDI Plus',
      color : 'white',
      fualtype : 'regular',
      status : false
    },
    {
      nickname : 'office',
      make : 'Jaguar',
      license : '4C F6879',
      modelnumber :'XJ',
      color : 'black',
      fualtype : 'premium',
      status : false
    },
    {
      nickname : 'vacation',
      make : 'Rolls Royce',
      license : 'UYR 869',
      modelnumber :'Dawn',
      color : 'Mate Black',
      fualtype : 'premium',
      status : true
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
