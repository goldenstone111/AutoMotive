import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ServicesService } from '../api/services.service';
import { FormGroup,FormBuilder,FormControl,Validators,Validator } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-vehicledetails',
  templateUrl: './vehicledetails.page.html',
  styleUrls: ['./vehicledetails.page.scss'],
})
export class VehicledetailsPage implements OnInit {
  pagename:any;
  data:any={ };
  colorlist:any=['Black','Blue','White','Gray','Yellow','Green','Orange','Purple','Red','Brown','Cyan','Olive','Plum','Olden','Magenta','Hot pink','Lime','Wheat','Maroon','Navy blue','Liquid Yellow','Championship White','Nardo Grey','Ultimate Green','Norfolk Mustard','Rosso Corsa',' Ermine White','Hugger Orange','Sub-lime','Silver Birch','Guards Red','Mica Blue','Oak Green'];
  fuellist:any=['Petrol','Diesel','other'];
  user_id:any;
  vehicle_id:any;
  updateVehical:FormGroup;
  constructor(private alertController: AlertController, private router:  Router,private formBuilder: FormBuilder, private api: ServicesService, public route: ActivatedRoute,) { }

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
    this.vehicle_id = this.route.snapshot.params.id;
    this.api.getVehicleDetails(this.user_id,this.vehicle_id).subscribe((result:any)=>{     
      if(result.status==200){
        this.data=result.success;
        this.pagename=this.data.vechile_nickname;

      } else {
        this.api.presentToast(result.error);
      }
    })

    this.updateVehical = this.formBuilder.group({
      nickname: new FormControl("", [
        Validators.required,
      ]),
      licence: new FormControl(""),
      color:new FormControl("", [
        Validators.required,
      ]),
      fueltype: new FormControl("", [
        Validators.required,
      ]),
    });
  }

  save(){
    this.api.updateVehicleDetails(this.user_id,this.vehicle_id,this.updateVehical.value).subscribe((result:any)=>{     
      console.log("update responce",result);
      
      if(result.status==200){
        this.api.presentToast(result.success);
        this.router.navigate(['/profile'])
      } else {
        this.api.presentToast(result.error);
      }
    })
  }

  async deletevehicle(){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode:'ios',
      cssClass: 'themeAlert',
      message: 'Do you want to Delete this Vehicle',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.api.deleteVehicle(this.user_id,this.vehicle_id).subscribe((result:any)=>{
              if(result.status==200){
                this.api.presentToast(result.success);
                this.router.navigate(['/profile'])
        
              } else {
                this.api.presentToast(result.error);
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
