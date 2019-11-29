import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-cameratest',
  templateUrl: './cameratest.page.html',
  styleUrls: ['./cameratest.page.scss'],
})
export class CameratestPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController,private camera:Camera, private file: File) { }

  ngOnInit() {
  }
  Picture;
  picture1;
  isPicture=false;
  file_url;
  file_name:any;
  async UploadOption() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select One",
      mode: "md",
      buttons: [
        {
          text: "Open Camera",
          role: "destructive",
          icon: "md-camera",
          handler: () => {
            this.openCamera(1);
          }
        },
        {
          text: "Open Gallery",
          icon: "md-image",
          handler: () => {
            this.openCamera(2);
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  openCamera(i) {
    const options: CameraOptions = {
      sourceType:
        i == 1
          ? this.camera.PictureSourceType.CAMERA
          : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 80,
      targetWidth: 150,
      allowEdit: true,
      targetHeight: 150,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        console.log("get data in FILE_URI format ", imageData);
        this.file_url=imageData;
        var fileName = this.file_url.substr(this.file_url.lastIndexOf('/') + 1);
        const date =new Date();
        this.file.getFile(this.file_url,fileName,{ create: false }).then((result)=>{
          console.log("file created",result);
          
        }).catch((err)=>{
          console.log("file not created",err);
        })
      
        // this.file.createFile(this.file_url,'image'+date, false)
       
      
      
      
      
      
        // this.Picture = `data:image/jpeg;base64,` + imageData;
        // this.picture1=imageData
        // this.isPicture = true;
        
      },
      err => {
        if (err == 20) {
          console.log(err);
          
          // this.api.presentToast("Please give permission in settings > app setting > sneakerhub > permissions in order to access camera");
        } else {
          console.log(err);
          // this.api.presentToast(err);
        }
      }
    );
  }
}
