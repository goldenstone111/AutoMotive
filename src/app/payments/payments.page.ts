import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../api/services.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-payments",
  templateUrl: "./payments.page.html",
  styleUrls: ["./payments.page.scss"]
})
export class PaymentsPage implements OnInit {
  user_id: any;
  Data: any;
  constructor(public api: ServicesService, public router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.user_id = localStorage.getItem("userId");
    } else {
      this.api.logout();
    }
    this.api.getusercarddetails(this.user_id).subscribe((result: any) => {
      if (result.status == 200) {
        this.Data = result.success;
        console.log(this.Data);
      } else {
        this.api.presentToast(result.error);
      }
    });
  }
  addCard() {
    localStorage.setItem("isCard", "true");
    this.router.navigate(["/completeprofile"]);
  }
  DeleteCard(id) {
    console.log("chk id ", id);
    this.api.deleteusercard(this.user_id, id).subscribe((result: any) => {
      if (result.status == 200) {
        this.api.presentToast(result.success);
       this.router.navigate(['/profile'])
      } else {
        this.api.presentToast(result.error);
      }
    });
  }
}
