import { Component, OnInit } from "@angular/core";
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: "app-otpverify",
  templateUrl: "./otpverify.page.html",
  styleUrls: ["./otpverify.page.scss"]
})
export class OtpverifyPage implements OnInit {
  isTimer=true;
  timer:any;
  timeLeft: number = 60;
  otpform: FormGroup;
  otpkey:any=[];
  constructor(private formBuilder: FormBuilder, public router : Router) {
    this.startTimer();
  }

  startTimer(){
     setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.isTimer=false;
        // this.timeLeft = 120;
      }
    },1000)
  }

  ngOnInit() {
    this.otpform = this.formBuilder.group({
      num1: new FormControl('',[Validators.required]),
      num2: new FormControl('',[Validators.required]),
      num3: new FormControl('',[Validators.required]),
      num4: new FormControl('',[Validators.required]),
      num5: new FormControl('',[Validators.required]),
      num6: new FormControl('',[Validators.required])
    });
    
  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
    if(nextElement==''){
      this.verifyOtp();
    }
  }

  verifyOtp(){
    if(this.otpform.valid){
      console.log(this.otpform.value);
      this.otpkey=Object.values(this.otpform.value);
      console.log("otpkey", this.otpkey);
      if(this.otpkey===this.otpkey){
        this.router.navigate(['/completeprofile']);
      }
    }
  }
}
