import { Component,ViewChild } from "@angular/core";
import { ToastController, Platform, ActionSheetController } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServicesService } from '../api/services.service';
declare let google: any;

map: google.maps.Map;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage  {


  @ViewChild('myId',{static:false}) myId: any;
  user_id:any;
  Addresses=[];
  vehicals=[];
  address:string;
  locations:any=[];
  slideOpts={
    initialSlide: 0,
    speed: 400,
    loop:true,
    slidesPerView:4,
    watchSlidesProgress:true,
  }

  constructor(private api:ServicesService, private platform: Platform,private geolocation: Geolocation, private actionSheetController: ActionSheetController) {
  
    this.platform.ready();
    
  }

  demo(lat, lng){

   this.locations=[
      ["Sneakr hub", 40.7761602,-74.0263092],
      ["Hamilton Park ", 40.772849, -74.017775],
      ["weehawken Water Tower", 40.775120, -74.020350],
      ["McDonald's", 40.775885, -74.031794],
    ];

 

    var map = new google.maps.Map(document.getElementById(this.myId.nativeElement.id), {
      zoom: 15,
      fullscreenControl: false,
      zoomControl: false,
      center: new google.maps.LatLng(lat,lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#f5f5f5'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f5f5'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#616161'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#eeeeee'}]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{"color": "#eeeeee"}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#757575'}]
        },
        {
          featureType: "poi.business",
          elementType: "labels.icon",
          stylers: [{"color": "#6f78cc"},{"saturation": 100 },{"lightness": 80},{"visibility": "on"},{"weight": 5.5}]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text",
          stylers: [
            {
              "color": "#7aa3c0"
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#e5e5e5'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9e9e9e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#ffffff'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#ffffff'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#757575'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#dadada'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#dadada'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#616161'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#eeeeee'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#e5e5e5'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#c9c9c9'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9e9e9e'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#c9c9c9'}]
        }
      ]
    });
    var infowindow = new google.maps.InfoWindow();

    var marker, pin, i;
    
    var storeIcon = {
      url: "../assets/home/map_store.svg", // url
      scaledSize: new google.maps.Size(35, 35)
    }
    var pinIcon = {
      url: '../../assets/home/pin.svg', // url
      scaledSize: new google.maps.Size(40,40),
    }

    pin = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      animation: google.maps.Animation.DROP,
      icon: pinIcon,
    });

    google.maps.event.addListener(pin, 'click', (function(pin, i) {
      return function() {
        infowindow.setContent('My location');
        infowindow.open(map, pin);
      }
    })(pin, i));
    

    for (i = 0; i < this.locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.locations[i][1], this.locations[i][2]),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: storeIcon,
      });

      google.maps.event.addListener(marker, 'click', (function(pin, i) {
        return function() {
          infowindow.setContent(this.locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }


  ngAfterViewInit(){
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
      this.getAddresses();      
    } else {
      this.api.logout();
    }
  }

  getAddresses(){
    this.api.getuseraddress(this.user_id,).subscribe((result:any)=>{     
      console.log("data from getuseraddress result ",result); 
      if (result.status == 200) {
        this.Addresses=result.success;
        this.getVehicals();
        if(!localStorage.getItem('selectAddress')){
          this.selectAddressoptions();
        }
      } else if (result.status == 201) {
        this.api.presentToast("No address please add new address");
        this.getLocation();
        this.getVehicals();
        // this.Address=[];
      } else{
        console.log();
        
      }
    })
  }
  getVehicals(){
  this.api.getVehiclePageData(this.user_id).subscribe((result:any)=>{
    console.log(result);
    this.vehicals=result.success;
    console.log("addresses and vehicals ", this.Addresses, this.vehicals);
    this.getLocation();
  })
}
  async selectAddressoptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select One',
      mode:'md',
      buttons: this.createAddressButtons()
    });
    await actionSheet.present();
  }
  createAddressButtons() {
    let buttons = [];
    for (let index in this.Addresses) {
      let button = {
        text: this.Addresses[index].address_title,
        icon: '../../assets/home/locationpin.svg',
        handler: () => {
          localStorage.setItem('selectAddress',JSON.stringify(this.Addresses[index]))
          this.demo(this.Addresses[index].lat,this.Addresses[index].lng)
        }
      }
      buttons.push(button);
    }
    return buttons;
  }
  async selectVehicaloptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select One',
      mode:'md',
      buttons: this.createVehicalButtons()
    });
    await actionSheet.present();
  }
  createVehicalButtons() {
    let buttons = [];
    for (let index in this.vehicals) {
      let button = {
        text: this.vehicals[index].vechile_nickname,
        icon: '../../assets/home/locationpin.svg',
        handler: () => {
          // console.log('setting icon ' + this.possibleButtons[index].icon);
          console.log(this.vehicals[index]);
          
          localStorage.setItem('selectVehical',JSON.stringify(this.vehicals[index]))
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  getLocation(){
    console.log(this.myId.nativeElement.id);
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("location data " , resp);
      
      let lat = resp.coords.latitude
      let lng = resp.coords.longitude
      console.log(lat,lng); 
      this.demo(lat,lng);
     }).catch((error) => {
       console.log("current location can't be detected", error);
      if(localStorage.getItem('selectAddress')){
        let address:any = localStorage.getItem('selectAddress');
        let lat = address.lat;
        let lng = address.lng;         
        this.demo(lat,lng);
      } else {
        this.selectAddressoptions();
        this.getLocation();
      }
    });
  }
}
