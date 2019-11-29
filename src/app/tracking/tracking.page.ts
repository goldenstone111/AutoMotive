import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { TrackingmodelPage } from '../trackingmodel/trackingmodel.page'
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: TrackingmodelPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
    return await modal.present();
  }
}
