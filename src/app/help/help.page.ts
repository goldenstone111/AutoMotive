import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"]
})
export class HelpPage implements OnInit {
  expand=false;
  QuestionList = [
    {
      question: "how to schedule a booking?",
      answer:
        "to make a booking for any kind of service you just need to login or signup (if you dont have account), then you fill your detail and vehical detail then you can make a booking with the following steps"
    },
    {
      question: "how to schedule a booking?",
      answer:
        "to make a booking for any kind of service you just need to login or signup (if you dont have account), then you fill your detail and vehical detail then you can make a booking with the following steps"
    },
    {
      question: "how to schedule a booking?",
      answer:
        "to make a booking for any kind of service you just need to login or signup (if you dont have account), then you fill your detail and vehical detail then you can make a booking with the following steps"
    },
    {
      question: "how to schedule a booking?",
      answer:
        "to make a booking for any kind of service you just need to login or signup (if you dont have account), then you fill your detail and vehical detail then you can make a booking with the following steps"
    }
  ];
  constructor() {}

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
}
