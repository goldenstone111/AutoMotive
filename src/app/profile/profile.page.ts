import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  list=[];
  constructor(public router:Router) { }

  ngOnInit() {
    this.list = [
      {
        title: "Booking",
        component: "../booking",
        icon: "../../assets/home/booking.svg"
      },
      {
        title: "My Location",
        component: "/address",
        icon: "../../assets/home/locationpin.svg"
      },
      {
        title: "Payments",
        component: "/payments",
        icon: "../../assets/home/payment.svg"
      },
      {
        title: "Vehicals",
        component: "/vehicals",
        icon: "../../assets/home/vehical.svg"
      },
      {
        title: "Transactions",
        component: "/transactions",
        icon: "../../assets/home/transaction.svg"
      },
      {
        title: "Help",
        component: "../help",
        icon: "../../assets/home/help.svg"
      }
    ]
  }
  openPage(item) {
    this.router.navigate([item.component]);
  }
}
