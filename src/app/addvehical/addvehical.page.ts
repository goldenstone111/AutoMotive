import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../api/services.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addvehical',
  templateUrl: './addvehical.page.html',
  styleUrls: ['./addvehical.page.scss'],
})
export class AddvehicalPage implements OnInit {
  backarrow="<";
  yearlist:any=[];
  companylist:any=[];
  modellist:any=[];
  colorlist:any=['Black','Blue','White','Gray','Yellow','Green','Orange','Purple','Red','Brown','Cyan','Olive','Plum','Olden','Magenta','Hot pink','Lime','Wheat','Maroon','Navy blue','Liquid Yellow','Championship White','Nardo Grey','Ultimate Green','Norfolk Mustard','Rosso Corsa',' Ermine White','Hugger Orange','Sub-lime','Silver Birch','Guards Red','Mica Blue','Oak Green'];
  fuellist:any=['Petrol','Diesel','other'];
  year:any;
  companyName:any;
  modalName:any;
  color:any;
  fuelType:any;
  licenseNumber:any;
  step=1;
  user_id:any;
  isBack=false;
  vehicle_id;
  licenceForm:FormGroup

  constructor(private router:  Router,private formBuilder: FormBuilder, public api: ServicesService,public alertController: AlertController) { }
 
  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
    this.api.getYearList(this.user_id).subscribe((result:any)=>{
      this.yearlist=result;
    })

    this.licenceForm = this.formBuilder.group({
      number: new FormControl("", [
        Validators.required,
        
      ]),
    });
  }
  back(){
    if(this.step>2){
      this.step=this.step-1
    }else if(this.step==2){
      this.isBack=false;
    }
  }
  setData(data){
    if(this.step==1){
      this.isBack=true;
      this.year=data.year;
      this.step=2;
      this.api.getMakeList(this.user_id,this.year).subscribe((result:any)=>{
        this.companylist=result;
      })
    } else if(this.step==2){
      this.companyName=data.make;
      this.isBack=true;
      console.log(this.companyName);
      this.step=3;
      this.api.getModalList(this.user_id,this.year,this.companyName).subscribe((result:any)=>{
        console.log("getmodalList ",result);
        this.modellist=result;
      })

    } else if(this.step==3){
      this.isBack=true;
      this.modalName=data.model;
      this.step=4;
    } else if(this.step==4){
      this.isBack=true;
      this.color=data;
      console.log(this.color);
      this.step=5;
    } else if(this.step==5){
      this.isBack=true;
      this.fuelType=data;
      console.log(this.fuelType);
      // this.step=6
      this.askforsave();
    } else if(this.step==6){
      this.isBack=true;
      this.licenseNumber=data;
      console.log(this.licenseNumber);
      // this.step=6;
    }
  }
  async askforsave(){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode:'ios',
      cssClass: 'themeAlert',
      message: 'Do you want to Add this Vehicle',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.resetValues();
            this.step=1;

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.saveDetails();
          }
        }
      ]
    });

    await alert.present();
  }

  resetValues(){
    this.year=''
    this.companyName='';
    this.modalName='';
    this.color='';
    this.fuelType='';
  }

  saveDetails(){
    console.log("all details have been saved ");
    this.api.addVehicleDetails(this.user_id,this.year,this.companyName,this.modalName,this.color,this.fuelType).subscribe((result:any)=>{
      console.log("add vehicle details", result);
      
      if(result.status==200){
        this.api.presentToast(result.success);
        this.step=6;
        this.vehicle_id=result.vehicle_id
      }
      else{
        this.api.presentToast(result.error);
        this.step=1;
      }
    })
  }
  updateLicenceNumber(){
    if(this.licenceForm.valid){
      this.licenseNumber=this.licenceForm.value.number;
      console.log("data sent",this.licenseNumber);
      this.api.updateLicenceNumber(this.user_id,this.vehicle_id,this.licenseNumber).subscribe((result:any)=>{
        console.log(result);
        if(result.status==200){
          this.api.presentToast(result.success);
          this.router.navigate(['/home'])
        }
        else{
          this.api.presentToast(result.error);
        }
      })
    } else {
      this.api.presentToast("Please Enter Vehicle Licence Number");
    }
    
    
  }
  skip(){
    this.api.presentToast('You Can Set Licence Number Later In Vehicle Section');
    this.router.navigate(['/home'])
  }
}
