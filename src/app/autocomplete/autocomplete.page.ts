import { Component, OnInit, NgZone } from "@angular/core";
import { ModalController } from "@ionic/angular";
declare let google: any;
@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.page.html",
  styleUrls: ["./autocomplete.page.scss"]
})
export class AutocompletePage implements OnInit {
  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any;
  latlong:any;
  // service = new google.maps.places.AutocompleteService();
  service = new google.maps.places.AutocompleteService();
  constructor(private modalCtrl: ModalController, private zone: NgZone) {}

  ngOnInit() {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ""
    };
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.geo = item;
    this.geoCode(this.geo)
   
  

    //convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == "") {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions(
      {
        input: this.autocomplete.query
      },
      (predictions, status) => {
        me.autocompleteItems = [];
        me.zone.run(() => {
          if (predictions != null) {
            predictions.forEach(prediction => {
              me.autocompleteItems.push(prediction.description);
            });
          }
        });
      }
    );
  }

  //convert Address string to lat and long
  geoCode(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.latlong={
        lat:this.latitude,
        long:this.longitude
      }
      this.geo={geo:this.geo, lat:this.latitude,long:this.longitude}
      this.modalCtrl.dismiss(this.geo,);
    });
  }
}
