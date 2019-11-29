import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ServicesService } from "../api/services.service";
@Component({
  selector: "app-completeprofile",
  templateUrl: "./completeprofile.page.html",
  styleUrls: ["./completeprofile.page.scss"]
})
export class CompleteprofilePage implements OnInit {
  profiledetail: FormGroup;
  carddetail: FormGroup;
  Picture: any;   // to display in real time 
  picture1:any;   // for backend
  user_id: any;
  step = 1;
  chooseOption: any;
  isPicture = false;
  countries = [{ nicename: "United State" }];
  validation_messages = {
    //personal details errors
    fname: [{ type: "required", message: "Please enter first name." }],
    lname: [{ type: "required", message: "Please enter last name." }],
    email: [
      { type: "required", message: "Please enter email." },
      { type: "email", message: "Enter a valid email." }
    ],
    zip: [
      { type: "required", message: "Zip code is required." },
      {
        type: "minlength",
        message: "Zip code must be at least 3 Character long."
      },
      { type: "maxlength", message: "Zip code must be at most 10 digit." }
    ],
    city: [{ type: "required", message: "Please enter city." }],
    state: [{ type: "required", message: "Please enter state." }],
    country: [{ type: "required", message: "Please select country." }],
    //card errors
    cnumber: [{ type: "required", message: "Enter card number." }],
    emonth: [{ type: "required", message: "Please select expiry month." }],
    eyear: [{ type: "required", message: "Please select expiry year." }],
    cvv: [
      { type: "required", message: "Please enter cvv." },
      // { type: "minlength", message: "cvv must be at least 3 digit." },
      { type: "maxlength", message: "cvv must be at most 4 digit." }
    ]
  };
  isError = false;
  monthlist: any = [];
  yearlist: any = [];
  iscard=false;
  selectOption: any = {
    header: "Select One"
  };
  constructor(
    public api: ServicesService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
    if (localStorage.getItem("isCard")) {
      this.step=2;
      this.iscard=true
    } 
    
    this.profiledetail = this.formBuilder.group({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      zip: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required])
    });
    this.carddetail = this.formBuilder.group({
      cnumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(19),
        Validators.minLength(12)
      ]),
      emonth: new FormControl("", [Validators.required]),
      eyear: new FormControl("", [Validators.required]),
      cvv: new FormControl("", [
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(3)
      ])
    });

    this.profiledetail.valueChanges.subscribe(console.log);
    this.carddetail.valueChanges.subscribe(() => {
      console.log(this.carddetail.status);
    });
    this.carddetail.status;
    for (let i = 1; i <= 12; i++) {
      this.monthlist.push(i);
    }
    for (let i = 22; i <= 70; i++) {
      this.yearlist.push(i);
    }
    this.api.getCountryName().subscribe((data: any) => {
      this.countries = data;
    });
  }

  continue() {
    if (this.step == 1) {
      if (!this.profiledetail.valid) {
        this.step = 1;
      } else {
        this.api
          .completeprofile1(this.profiledetail.value, this.user_id)
          .subscribe((result: any) => {
            if (result.status == 200) {
              this.api.presentToast(result.success);
              this.step = 2;
            } else {
              this.api.presentToast(result.error);
            }
          });
      }
    } else if (this.step == 2) {
      if (!this.carddetail.valid) {
      } else {
        if(this.iscard==false){
          this.api
          .completeprofile2(this.carddetail.value, this.user_id)
          .subscribe((result: any) => {
            console.log("card save", result);
            if (result.status == 200) {
              this.api.presentToast(result.success);
              this.step = 3;
            } else {
              this.api.presentToast(result.error);
            }
          });
        } else {
          this.api
          .Addnewcard(this.carddetail.value, this.user_id)
          .subscribe((result: any) => {
            console.log("card save", result);
            if (result.status == 200) {
              this.api.presentToast(result.success);
              this.router.navigate(['/profile']);
              localStorage.removeItem('isCard');
            } else {
              this.api.presentToast(result.error);
            }
          });
        }
        
      }
    }
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
        console.log("get image in FILE_URI format ", imageData);
        this.Picture = `data:image/jpeg;base64,` + imageData;
        this.picture1=imageData
        this.isPicture = true;
        // this.imageData = imageData;
        //console.log(this.data.image);
        // this.user.picture = this.data.image;
        // this.presentAlertConfirm();
        console.log("Camera console");
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

  saveDetails() {
    this.api.setprofilepicture(this.picture1,this.user_id).subscribe((result:any)=>{
      if (result.status == 200) {
        this.api.presentToast(result.success);
        this.router.navigate(["/addvehical"]);
      } else {
        this.api.presentToast(result.error);
      }
    })
    
  }
  skip(){
    this.api.presentToast("You can set your profile picture later in profile section.")
    this.router.navigate(["/addvehical"]);
  }
}
