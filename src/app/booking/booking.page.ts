import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  bookingData:any=[];
  active1:any;
  active2:any;
  active3:any=true;
  data1=[
    {
      title: 'booking 1',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '4.5'
    },
    {
      title: 'booking 2',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '2.5'
    },
    {
      title: 'booking 3',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating :'3.5'
    },
    {
      title: 'booking 4',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '5'
    }
  ];
  data2=[
    {
      title: 'booking 5',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '4.5'
    },
    {
      title: 'booking 6',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '2.5'
    },
    {
      title: 'booking 7',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating :'3.5'
    },
    {
      title: 'booking 8',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '5'
    }
  ];
  data3=[
    {
      title: 'booking 9',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '4.5'
    },
    {
      title: 'booking 10',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '2.5'
    },
    {
      title: 'booking 11',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating :'3.5'
    },
    {
      title: 'booking 12',
      time: ' 12 May 2019 | 5:20 PM',
      id:'788945561256',
      rating: '5'
    }
  ];
  constructor() { }

  ngOnInit() {
    this.getdata(3);
  }
  getdata(id){
    if(id==1){
      this.bookingData=this.data1;
      this.active1=true;
      this.active2=false;
      this.active3=false;
    } else if(id==2){
      this.bookingData=this.data2;
      this.active1=false;
      this.active2=true;
      this.active3=false;
    } else{
      this.bookingData=this.data3;
      this.active1=false;
      this.active2=false;
      this.active3=true;
    }
  }

}
