import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl, FormControl , Validators } from '@angular/forms';
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
    },
    {
      name: "AmericanSamoa",
      dial_code: "+1 684",
      code: "AS"
    },
    {
      name: "Andorra",
      dial_code: "+376",
      code: "AD"
    },
    {
      name: "Angola",
      dial_code: "+244",
      code: "AO"
    },
    {
      name: "Anguilla",
      dial_code: "+1 264",
      code: "AI"
    },
    {
      name: "Antigua and Barbuda",
      dial_code: "+1268",
      code: "AG"
    },
    {
      name: "Argentina",
      dial_code: "+54",
      code: "AR"
    },
    {
      name: "Armenia",
      dial_code: "+374",
      code: "AM"
    },
    {
      name: "Aruba",
      dial_code: "+297",
      code: "AW"
    },
    {
      name: "Australia",
      dial_code: "+61",
      code: "AU"
    },
    {
      name: "Austria",
      dial_code: "+43",
      code: "AT"
    },
    {
      name: "Azerbaijan",
      dial_code: "+994",
      code: "AZ"
    },
    {
      name: "Bahamas",
      dial_code: "+1 242",
      code: "BS"
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      code: "BH"
    },
    {
      name: "Bangladesh",
      dial_code: "+880",
      code: "BD"
    }
  ];
  signupForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
   
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
}
