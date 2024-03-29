import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl, FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  initial:any;
  country:any;
  countries = [
    {
      name: "United States",
      dial_code: "+1",
      code: "USA"
    },
    {
      name: "Israel",
      dial_code: "+972",
      code: "ILY"
    },
    {
      name: "Afghanistan",
      dial_code: "+93",
      code: "AF"
    },
    {
      name: "Albania",
      dial_code: "+355",
      code: "AL"
    },
    {
      name: "Algeria",
      dial_code: "+213",
      code: "DZ"
    }
  ];
  signupForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, public router: Router) {
   
  }



  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      countryform: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      terms: new FormControl ('', [Validators.requiredTrue])
    });
    this.signupForm.valueChanges.subscribe(console.log);
    
    this.country=this.countries[0];
    console.log("Initial country ", this.country );
    
  }
  setCountryCode(id){
    console.log(id);
    this.country=this.countries[id];
    console.log("select country", this.country);
    
  }
  register(){
    this.router.navigate(['/otpverify']);
  }
}
