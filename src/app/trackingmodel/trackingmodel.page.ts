import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-trackingmodel',
  templateUrl: './trackingmodel.page.html',
  styleUrls: ['./trackingmodel.page.scss'],
})
export class TrackingmodelPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  closeModel(){
    this.modalController.dismiss();
  }
}
