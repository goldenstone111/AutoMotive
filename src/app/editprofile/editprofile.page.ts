import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from "@angular/forms";
import { ServicesService } from '../api/services.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  updateProfile:FormGroup;
  Picture: any;   // to display in real time 
  picture1:any;   // for backend
  user_id: any;
  isPicture = false;
  data:any={ }
  constructor(private formBuilder: FormBuilder,public actionSheetController: ActionSheetController,
    public camera: Camera,public api: ServicesService,public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
    this.updateProfile = this.formBuilder.group({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("")
    });
    this.api.getedituserprofiledetails(this.user_id).subscribe((result:any)=>{
      console.log("get edit data", result);
      
      if (result.status == 200) {
        this.data=result.success
        if(result.customer_picture!=''){
          // this.Picture = "data:image/jpeg;base64," +this.data.image;
          this.Picture=this.data.customer_picture;
          this.isPicture=true
        }
      } else {
        this.api.presentToast(result.error);
      }
    })
    
  }

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
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 80,
      targetWidth: 150,
      allowEdit: true,
      targetHeight: 150,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.Picture = "data:image/jpeg;base64," + imageData;
        this.picture1=imageData
        this.isPicture = true;
        console.log("Camera console");
        this.UpdateProfilePicture()
      },
      err => {
        if (err == 20) {
          this.api.presentToast("Please give permission in settings > app setting > sneakerhub > permissions in order to access camera");
        } else {
          this.api.presentToast(err);
        }
      }
    );
  }
  UpdateProfilePicture(){
    this.api.setprofilepicture(this.picture1,this.user_id).subscribe((result:any)=>{
      if (result.status == 200) {
        this.api.presentToast(result.success);
      } else {
        this.api.presentToast(result.error);
      }
    })
    
  }
  UpdateProfileDetails(){
    this.api.updateProfileDetails(this.user_id,this.updateProfile.value).subscribe((result:any)=>{
      if (result.status == 200) {
        this.api.presentToast(result.success);
        this.router.navigate(["/profile"]);
      } else {
        this.api.presentToast(result.error);
      }
    })                        
  }

}
