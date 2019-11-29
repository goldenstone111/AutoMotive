import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ServicesService } from "../api/services.service";

@Component({
  selector: "app-otpverify",
  templateUrl: "./otpverify.page.html",
  styleUrls: ["./otpverify.page.scss"]
})
export class OtpverifyPage implements OnInit {
  isTimer = true;
  timer: any;
  timeLeft: number = 60;
  otpform: FormGroup;
  otpkey: any = [];
  otpvalue;
  data: any;
  code: any;
  mobile: any;
  key: any;
  inputotp = "";
  userid: any;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public api: ServicesService
  ) {
    this.startTimer();
    this.key = route.snapshot.params.key;
    if (this.key == 1) {
      this.otpvalue = route.snapshot.params.otp;
      this.code = route.snapshot.params.phone_code;
      this.mobile = route.snapshot.params.phone_number;
    } else {
      this.userid = route.snapshot.params.user_id;
      this.otpvalue = route.snapshot.params.otp;
    }

    console.log(
      "got data from signup",
      this.otpvalue,
      this.code,
      this.mobile,
      this.key
    );
  }

  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.isTimer = false;
        // this.timeLeft = 120;
      }
    }, 1000);
  }

  ngOnInit() {
    this.otpform = this.formBuilder.group({
      num1: new FormControl("", [Validators.required]),
      num2: new FormControl("", [Validators.required]),
      num3: new FormControl("", [Validators.required]),
      num4: new FormControl("", [Validators.required]),
      num5: new FormControl("", [Validators.required]),
      num6: new FormControl("", [Validators.required])
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
    if (nextElement == "") {
      this.verifyOtp();
    }
  }

  verifyOtp() {
    if (this.otpform.valid) {
      console.log(this.otpform.value);

      this.otpkey = Object.values(this.otpform.value);

      this.inputotp = "";
      for (var i = 0; i < this.otpkey.length; i++) {
        this.inputotp += this.otpkey[i];
      }
      console.log(this.inputotp);
      if (this.inputotp == this.otpvalue) {
        console.log("otp verified");
        if (this.key == 1) {
          this.api
            .saveData(this.code, this.mobile, this.otpvalue)
            .subscribe((result: any) => {
              if (result.status == 200) {
                this.api.presentToast(result.success);
                this.userid = result.user_id;
                localStorage.setItem("userId", JSON.stringify(this.userid));
                this.router.navigate(["/completeprofile"]);
              } else if (result.status == 400) {
                this.api.presentToast(result.error);
              }
            });
        } else {
          localStorage.setItem("userId", JSON.stringify(this.userid));
          this.router.navigate(["/home"]);
        }
      } else {
        this.api.presentToast("Invalid OTP Please Enter a Valid OTP");
      }
    }
  }

  resendOtp() {
    if (this.key == 1) {
      this.api.presentLoading();
      this.api
        .createAccount(this.code, this.mobile)
        .subscribe((result: any) => {
          console.log("responce sign up", result);
          if (result.status == 400) {
            this.api.presentToast(result.error);
            this.api.loadingDismiss();
          } else if (result.status == 200) {
            this.api.presentToast(result.success);
            this.otpvalue = result.otp;
            this.api.loadingDismiss();
          }
        });
    } else {
      this.api.resendOtp(this.userid).subscribe((result: any) => {
        this.api.presentToast(result.success);
        console.log("responce sign up", result);
        this.otpvalue = result.otp;
      });
    }
  }
}
