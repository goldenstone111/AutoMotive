import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-completeprofile",
  templateUrl: "./completeprofile.page.html",
  styleUrls: ["./completeprofile.page.scss"]
})
export class CompleteprofilePage implements OnInit {
  profiledetail: FormGroup;
  carddetail: FormGroup;
  picdetail: FormGroup;
  step = 1;
  isPicture=false;
  countries = [
    {
      name: "United States",
      dial_code: "+1",
      code: "US"
    },
    {
      name: "Israel",
      dial_code: "+972",
      code: "IL"
    },
    {
      name: "Afghanistan",
      dial_code: "+93",
      code: "AF"
    }
  ];
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
      { type: "minlength", message: "Zip code must be at least 3 Character long." },
      { type: "maxlength", message: "Zip code must be at most 10 digit." }
    ],
    city: [{ type: "required", message: "Please enter city." }],
    state: [{ type: "required", message: "Please enter state." }],
    country: [{ type: "required", message: "Please select country." }],
    //card errors
    cnumber:[{ type: "required", message: "Enter card number." }],
    emonth:[{ type: "required", message: "Please select expiry month." }],
    eyear:[{ type: "required", message: "Please select expiry year." }],
    cvv:[
      { type: "required", message: "Please enter cvv." },
      { type: "minlength", message: "cvv must be at least 3 digit." },
      { type: "maxlength", message: "cvv must be at most 4 digit." },
    ]
  };

  constructor(private formBuilder: FormBuilder, public router: Router) {}

  ngOnInit() {
    this.profiledetail = this.formBuilder.group({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.email]),
      zip: new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required])
    });
    this.carddetail = this.formBuilder.group({
      cnumber: new FormControl("", [Validators.required,Validators.maxLength(19),Validators.minLength(12)]),
      emonth: new FormControl("", [Validators.required]),
      eyear: new FormControl("", [Validators.required]),
      cvv: new FormControl("", [Validators.required,Validators.maxLength(4),Validators.minLength(3)])
    });
  }

  continue() {
    if(!this.profiledetail.valid){
      console.log("complete step 1 properly");
    }else {
      this.step=2 
      if(!this.carddetail.valid){
        console.log("complete step 2 properly");
      }else {
        this.step=3 

      }
    }
  }
  saveDetails(){
    console.log("all data have been saved successfully :) Thank you to be with us!");
  }
}
