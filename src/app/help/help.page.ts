import { Component, OnInit } from "@angular/core";
import { ServicesService } from '../api/services.service';

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"]
})
export class HelpPage implements OnInit {
  expand=false;
  QuestionList = [];
  constructor(private api:ServicesService) {}

  ngOnInit() {}
  showmore(i)
  {
    document.getElementById(i).style.display = 'none';
    document.getElementById(i+"second").style.display = 'block';
  }
  showless(i)
  {
    document.getElementById(i+"second").style.display = 'none';
    document.getElementById(i).style.display = 'block';
  }
  getallcustomerfaq(){
    this.api.getallcustomerfaq().subscribe((result:any)=>{
      console.log("asdfasdff",result);
      
      if(result.status==200){
        this.QuestionList=result.success
      }
    })
  }
    ionViewWillEnter(){
      this.getallcustomerfaq();
    }
}
