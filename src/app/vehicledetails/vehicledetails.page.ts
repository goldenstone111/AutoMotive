import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-vehicledetails',
  templateUrl: './vehicledetails.page.html',
  styleUrls: ['./vehicledetails.page.scss'],
})
export class VehicledetailsPage implements OnInit {
  pagename:any;
  data:any;

  constructor(public activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      console.log("hello res is here", res);
      this.pagename=res.make+' '+ res.modelnumber;
      this.data=res;
    })
  }

}
