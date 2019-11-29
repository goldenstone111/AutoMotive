import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../api/services.service';
import { Router } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  user_id:any;
  Address=[];
  myFile: any = {};
  imagesProvider;
  url='https://dev.hawkscode.com.au/automotive-uber/managepro/Webservice_customer/addcustomfile';
  constructor(public camera: Camera, private api: ServicesService, private router:Router, private transfer: FileTransfer, private file: File) { }

  
  
  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
      
    } else {
      this.api.logout();
    }
   
  }
  getAddresses(){
    this.api.getuseraddress(this.user_id,).subscribe((result:any)=>{     
      console.log("data from getuseraddress result ",result); 
      if (result.status == 200) {
        this.Address=result.success;
      } else if (result.status == 201) {
        this.api.presentToast(result.success);
        this.Address=[];
      } else{
        this.api.presentToast(result.error);
        this.router.navigate(['/profile'])
      }
    })
  }
  delete(location_id){
    this.api.deleteuseraddress(this.user_id,location_id).subscribe((result:any)=>{     
      console.log("data from deleteuseraddress   result ",result); 
      if (result.status == 200) {
        this.api.presentToast(result.success);
        this.getAddresses();
      } else {
        this.api.presentToast(result.error);
        this.getAddresses();
      }
    })
  }
  ionViewWillEnter(){
    this.getAddresses();
  }
 
}
