import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-otpverify",
  templateUrl: "./otpverify.page.html",
  styleUrls: ["./otpverify.page.scss"]
})
export class OtpverifyPage implements OnInit {
  isTimer=true;
  timer:any;
  timeLeft: number = 60;
  constructor() {
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

  ngOnInit() {}
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
  }
}
