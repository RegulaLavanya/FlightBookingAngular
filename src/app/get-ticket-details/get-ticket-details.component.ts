import { Component, OnInit } from '@angular/core';
import { Form,Validators,FormControl,FormBuilder} from '@angular/forms';
import { BookingServiceService } from '../booking-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-ticket-details',
  templateUrl: './get-ticket-details.component.html',
  styleUrls: ['./get-ticket-details.component.css']
})
export class GetTicketDetailsComponent implements OnInit {

  getTicket:any
  submitted:any
  searchres=false;
  //TicketData:any;
  TicketData:any = [];
  airLineId:any;
     flightName:any
     fromPlace:any;
     toPlace:any;
     startDateTime:any;
     endDateTime:any;
     price:any;
     pnrId:any

  constructor(private formBuilder:FormBuilder,
    private bookingService: BookingServiceService) { }

    get f() { return this.getTicket.controls; }

  ngOnInit(): void {
    this.getTicket=this.formBuilder.group({
      pnr :['',Validators.required],
     
    })

    this.submitted=false;
  }

  onGetDetails(data:any){
 
    if(this.getTicket.invalid){
      return;
    }
   // this.TicketData=[];
    this.bookingService.Getpnrdata(data.pnr).subscribe((data:any)=>{
     this.searchres=true;
     this.TicketData=data;
     console.log((this.TicketData));
     this.airLineId=this.TicketData.airLineId;
     this.flightName=this.TicketData.flightName;
     this.fromPlace=this.TicketData.fromPlace;
     this.toPlace=this.TicketData.toPlace;
     this.startDateTime=this.TicketData.startDateTime;
     this.endDateTime=this.TicketData.endDateTime;
     this.price=this.TicketData.price;
     this.pnrId=this.TicketData.pnr;

     
   
      this.getTicket.reset();
     },(error:HttpErrorResponse)=>{
        console.log(error);  
     });
    }


}
