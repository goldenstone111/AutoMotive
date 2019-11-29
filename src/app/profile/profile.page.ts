import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  list=[];
  user_id:any;
  picture:any;
  name:any;
  number:any;
  isPicture=false;
  constructor(public router:Router,public api: ServicesService) { }

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
    this.Getuserprofilename()
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
        title: "Vehicles",
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
  Getuserprofilename(){
    console.log("getuserprofilename result");
    this.api.getuserprofilename(this.user_id).subscribe((result:any)=>{      
      if (result.status == 200) {
        console.log("data from getuserprofilename result ",result);
        this.name=result.success.customer_name;
        this.number=result.success.user_phone
        if(result.success.customer_picture!=''){
          console.log("data from getuserprofilename inside if ",result.success.customer_picture );
          
          // this.Picture = "data:image/jpeg;base64," +this.data.image;
          this.picture=result.success.customer_picture;
          this.isPicture=true
        }
        
      } else {
        this.api.presentToast(result.error);
      }
    })
  }
  logout(){
    this.api.logout();
    this.api.presentToast('You have been logout successfully.')
  }
}
