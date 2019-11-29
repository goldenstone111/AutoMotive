import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutocompletePage } from '../autocomplete/autocomplete.page';
import { ServicesService } from '../api/services.service';
import { Router } from '@angular/router';
// import {ElementRef, ViewChild} from '@angular/core';
// declare let google: any;
@Component({
  selector: 'app-newaddress',
  templateUrl: './newaddress.page.html',
  styleUrls: ['./newaddress.page.scss'],
})

export class NewaddressPage implements OnInit {

  address;
  isAddress=false;
  saveData:any={};
  user_id
  constructor(private modalCtrl:ModalController,private api:ServicesService,private router:Router) {
    this.address = {
      place: ''
    };
   }

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
  }
  gotolocation(){
    let place = document.getElementById('address');;
    console.log(place);
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AutocompletePage
    });

    modal.onDidDismiss()
      .then((data) => {
        this.address.place = data.data.geo;
        this.saveData=data.data;
        console.log("data from modal", this.saveData);
        if(this.address.place!==''){
          this.isAddress=true
        }
    });

    return await modal.present();
  }
  saveaddress(){
    this.api.addnewaddress(this.user_id,this.saveData).subscribe((result:any)=>{     
      console.log("data from getuserprofilename result ",result); 
      if (result.status == 200) {
        this.api.presentToast(result.success);
        this.router.navigate(['/profile'])
      } else {
        this.api.presentToast(result.error);
        this.router.navigate(['/profile'])
      }
    })
  }
}
