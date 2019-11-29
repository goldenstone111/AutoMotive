import { Component, OnInit, ViewChild } from "@angular/core";
import { ServicesService } from "../api/services.service";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  initial: any;
  country: any;
  flag:any;
  code:any;
  selectOption:any={
    header:'Select One'
  }
  countries = [
    {
      Name: "United State",
      code: "USA",
      dial_code: "+1",
      icon: "../../assets/icon/usa.png"
    }
  ];
  signupForm: FormGroup;
  validation_messages = {
    mobile: [
      { type: "required", message: "Phone number is required." },
      { type: "maxlength", message: "Phone number must be at most 10 digit." },
      { type: "minlength", message: "Phone number must be at least 10 digit." }
    ],
    terms: [{ type: "requiredTrue", message: "Please check the box." }]
  };

  constructor(private formBuilder: FormBuilder, public router: Router, public api: ServicesService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      mobile: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      terms: new FormControl("", [Validators.requiredTrue])
    });
    this.signupForm.valueChanges.subscribe(console.log);
  }

  setCountryCode(id) {
    id=id.detail.value;
    this.country = id.Name;
    this.flag = id.icon;
    this.code = id.dial_code;
  }
  register() {
    this.api.presentLoading();
    this.api.createAccount(this.code,this.signupForm.value.mobile).subscribe((result:any)=>{
      console.log("responce sign up",result);
      if(result.status==400){
        this.api.presentToast(result.error);
        this.router.navigate(['/login']);
        this.api.loadingDismiss();
      }
      else if(result.status==200){
        this.api.presentToast(result.success);
        this.router.navigate(["/otpverify",result]);
        this.api.loadingDismiss();
      }
    });
    
  }
  ionViewWillEnter(){
    // this.api.presentLoading();
    this.api.getCountryList().subscribe((data:any)=>{
      console.log("data from the api getcountry data", data)
      this.countries=data;
      // this.api.loadingDismiss();
    })
  }
  ionViewDidEnter(){
    this.code = this.countries[0].dial_code;
    console.log("initial code for country",this.code);
    this.country = this.countries[0].Name;
    this.flag = this.countries[0].icon;
    console.log("initial flag for country",this.flag);
  }
}
