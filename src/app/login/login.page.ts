import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../api/services.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
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
  validation_messages = {
    mobile: [
      { type: "required", message: "Phone number is required." },
      { type: "maxlength", message: "Phone number must be at most 10 digit." },
      { type: "minlength", message: "Phone number must be at least 10 digit." }
    ]
  };
  constructor(private formBuilder: FormBuilder, public api: ServicesService, public router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobile: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ])
    });
    this.loginForm.valueChanges.subscribe(console.log);

    this.country = this.countries[0];
    console.log("Initial country ", this.country);
  }
  setCountryCode(id) {
    id=id.detail.value;
    this.country = id.Name;
    this.flag = id.icon;
    this.code = id.dial_code;
  }
  login() {
    this.api.login(this.code,this.loginForm.value.mobile).subscribe((result:any)=>{
      console.log("responce sign up",result);
      if(result.status==400){
        this.api.presentToast(result.success);
        this.router.navigate(['/login']);
      }
      else if(result.status==200){
        this.api.presentToast(result.success);
        this.router.navigate(["/otpverify",result]); 
      }
      
    });
  }
  ionViewWillEnter(){
    this.api.getCountryList().subscribe((data:any)=>{
      console.log("data from the api getcountry data", data)
      this.countries=data;
    })
  }
  ionViewDidEnter(){
    this.code = this.countries[0].dial_code;
    console.log("initial code for country",this.code);
    
    this.flag = this.countries[0].icon;
    console.log("initial flag for country",this.flag);
  }
}
