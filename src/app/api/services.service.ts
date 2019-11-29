import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  apiUrl = "https://dev.hawkscode.com.au/automotive-uber/managepro/Webservice_customer";

  image : any = {};

  constructor( private router: Router, private uniqueDeviceID: UniqueDeviceID, private networkInterface: NetworkInterface, private http: HttpClient, public loadingController: LoadingController, public toastController: ToastController ) 
  { 
    this.getcredential();
  }

  // global methods in services -----------------------------------------
  ip:any;
  deviceId:any;
  async presentLoading() {//Loding Controller Start 
    return await this.loadingController.create({
      spinner: 'crescent',
      mode: "md",
      cssClass: 'custom-loading',
    }).then(a => { a.present() })

  }

  async loadingDismiss() {
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  } 
  

  async presentToast(toastMessage) {  
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'bottom',
      duration: 2000,
      cssClass : 'customToast'
    });
    return toast.present();
  }

  handleError(error) {
    console.log("error in handleError ", error);
    return Observable.throw(error || 'No internet connection');
  }

  getcredential(){
      // get device id code
  this.uniqueDeviceID.get().then((uuid: any) => {
    this.deviceId = uuid;
  })
  .catch((error: any) => {
    console.log(error)
    this.deviceId=Math.floor((Math.random()*(5000000000000000000+1))+100000000000)
    
  });
     //getting IP address
     this.networkInterface.getCarrierIPAddress()
     .then((address) => {
       this.ip = address.ip; 
       let subnet=address.subnet;
     })
     .catch(
       
    error => {console.error(`Unable to get IP: ${error}`)
    this.networkInterface.getWiFiIPAddress()
    .then((address) => {
      this.ip=address.ip; 
      let subnet=address.subnet;
    })
    .catch(
      error => {console.error(`Unable to get IP: ${error}`)
      this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(address => {
        this.ip = address.ip;    
        console.log("IP & DeviceId in static ip", this.ip,this.deviceId);
      })
    });  
  });
  }

  logout(){
    this.router.navigate(['/authentication'])
    // localStorage.removeItem('userId');
    localStorage= null;
    
     
  }
  //api from backend-----------------------------------------------

  getCountryList(){
    return this.http.post(`${this.apiUrl}/getcountrydata`, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  createAccount(a,b){
    const obj = { phone_code: a, phone_number: b};
    return this.http.post(`${this.apiUrl}/customerregister`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  saveData(a,b,c){
    const obj = { phone_code: a, phone_number: b, device_id: this.deviceId, customer_ip: this.ip, otp:c };
    return this.http.post(`${this.apiUrl}/insertcustomerregisterdetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  
  resendOtp(userid){
    const obj = { user_id:userid};
    return this.http.post(`${this.apiUrl}/resendotpcustomer`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  login(a,b){
    const obj = { phone_code: a, phone_number: b, device_id: this.deviceId, customer_ip: this.ip  };
    return this.http.post(`${this.apiUrl}/logincustomer`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getCountryName(){
    return this.http.post(`${this.apiUrl}/getcountrynicename`, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  }
  
  completeprofile1(formdata, id){    
    const obj = { 
      user_id: JSON.parse(id), fname: formdata.fname, 
      lname: formdata.lname, email: formdata.email, 
      address:formdata.address, zip: formdata.zip, 
      city: formdata.city, state: formdata.state ,country: formdata.country };
    return this.http.post(`${this.apiUrl}/updatecustomersdetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  completeprofile2(formdata,id){
    const obj = { 
      user_id: JSON.parse(id), cnumber: formdata.cnumber, 
      emonth: formdata.emonth, eyear: formdata.eyear, 
      cvv: formdata.cvv
    }
    return this.http.post(`${this.apiUrl}/addcustomercarddetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  setprofilepicture(picture,id){
    const obj = { 
      user_id: JSON.parse(id), image: picture
    }
    return this.http.post(`${this.apiUrl}/addownerprofileimage`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  
  getYearList(id){
    const obj = { 
      user_id: JSON.parse(id)
    }
    return this.http.post(`${this.apiUrl}/getcarmodelyearlist`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getMakeList(id,year){
    const obj = { 
      user_id: JSON.parse(id),
      year:year
    }
    return this.http.post(`${this.apiUrl}/getyearmakecarlist`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getModalList(id,year,make){
    const obj = { 
      user_id: JSON.parse(id),
      year:year,
      make:make
    }
    return this.http.post(`${this.apiUrl}/getyearmakecarmodellist`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addVehicleDetails(id,year,make,model,color,fueltype){
    const obj = { 
      user_id: JSON.parse(id),
      year:year,
      make:make,
      model:model,
      color:color,
      fueltype:fueltype
    }
    return this.http.post(`${this.apiUrl}/insertuservechiledetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  
  updateLicenceNumber(id,vehicle_id,licence_number){
    const obj = { 
      user_id: JSON.parse(id),
      vehicle_id:vehicle_id,
      vechile_license:licence_number
    }
    return this.http.post(`${this.apiUrl}/updatevechilelicensenumber`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }


  getuserprofilename(id){
    const obj = { 
      user_id: JSON.parse(id)
    }
    return this.http.post(`${this.apiUrl}/getuserprofilename`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getVehiclePageData(id){
    const obj = { 
      user_id: JSON.parse(id)
    }
    return this.http.post(`${this.apiUrl}/getuservechiledetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  
  getVehicleDetails(id,vehicle_id){
    const obj = { 
      user_id: JSON.parse(id),
      vehicle_id:vehicle_id
    }
    return this.http.post(`${this.apiUrl}/getvechiledetailbyid`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  updateVehicleDetails(id,vehicle_id,values){
    const obj = { 
      user_id: JSON.parse(id),
      vehicle_id:vehicle_id,
      vechile_nickname:values.nickname,
      vechile_license:values.licence,
      vechile_colour:values.color,
      vechile_fueltype:values.fueltype,
    }
    return this.http.post(`${this.apiUrl}/updateuservechiledetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  deleteVehicle(id,vehicle_id){
    const obj = { 
      user_id: JSON.parse(id),
      vehicle_id:vehicle_id,
    }
    return this.http.post(`${this.apiUrl}/deleteuservechile`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getedituserprofiledetails(id){
    const obj = { 
      user_id: JSON.parse(id)
    }
    return this.http.post(`${this.apiUrl}/getedituserprofiledetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  updateProfileDetails(id,values){
    const obj = { 
      user_id: JSON.parse(id),
      fname:values.fname,
      lname:values.lname,
      email:values.email,
      mobile:values.mobile,
    }
    console.log(obj);
    return this.http.post(`${this.apiUrl}/updatecustomerprofiledetail`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  getusercarddetails(id){
    const obj = { 
      user_id: JSON.parse(id)
    }
    return this.http.post(`${this.apiUrl}/getusercarddetails`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  deleteusercard(id,card_id){
    console.log(id,card_id);
    
    const obj = { 
      user_id: JSON.parse(id),
      id: card_id
    }
    return this.http.post(`${this.apiUrl}/deleteusercard`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  Addnewcard(formdata,id){
    const obj = { 
      user_id: JSON.parse(id), cnumber: formdata.cnumber, 
      emonth: formdata.emonth, eyear: formdata.eyear, 
      cvv: formdata.cvv
    }
    return this.http.post(`${this.apiUrl}/addnewcardafterlogin`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

  }
  addnewaddress(id,data){
    const obj = { 
      user_id: JSON.parse(id), address: data.geo, 
      lat: data.lat, lng: data.long
    }
    console.log(obj);
    
    return this.http.post(`${this.apiUrl}/adduserlocation`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});  
  }
  getuseraddress(id){
    const obj = { 
      user_id: JSON.parse(id)
    }
    return this.http.post(`${this.apiUrl}/getuserlocations`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  deleteuseraddress(id,location_id){
    const obj = { 
      user_id: JSON.parse(id),
      location_id:location_id
    }
    console.log(obj);
    
    return this.http.post(`${this.apiUrl}/deleteuserlocation`, obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

  }
  getallcustomerfaq(){
    return this.http.post(`${this.apiUrl}/getallcustomerfaq`, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

}
 