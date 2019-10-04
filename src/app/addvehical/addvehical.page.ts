import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addvehical',
  templateUrl: './addvehical.page.html',
  styleUrls: ['./addvehical.page.scss'],
})
export class AddvehicalPage implements OnInit {
  yearlist:any=[];
  companylist:any=[1,2,3,4,5,6,7,8,9,0,12,21,3,234,354,354,45,453,42];
  modellist:any=[1,2,3,4,5,6,7,8,9,0,12,21,3,234,354,354,45,453,42];
  colorlist:any=[1,2,3,4,5,6,7,8,9,0,12,21,3,234,354,354,45,453,42];
  fuellist:any=[1,2];
  constructor() { }
  year:any;
  companyName:any;
  modalNumber:any;
  color:any;
  fuelType:any;
  licenseNumber:any;
  step=1;
  isBack=false;
  ngOnInit() {
    for(let i=2019;i>=1990;i--){
      this.yearlist.push(i);
    }
    console.log(this.yearlist);
    
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
      this.year=data;
      console.log(this.year);
      this.step=2;
    } else if(this.step==2){
      this.companyName=data;
      this.isBack=true;
      console.log(this.companyName);
      this.step=3;
    } else if(this.step==3){
      this.isBack=true;
      this.modalNumber=data;
      console.log(this.modalNumber);
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
      this.step=6;
    } else if(this.step==6){
      this.isBack=true;
      this.licenseNumber=data;
      console.log(this.licenseNumber);
      this.step=6;
    }
  }

  saveDetails(){
    console.log("all details have been saved ");
    
  }
}
