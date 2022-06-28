import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { BookingServiceService } from '../booking-service.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  constructor(private auth:AuthServiceService,
    private bookservice:BookingServiceService) { }

  bookticketForm:any;
  airlineList:any;
  airline:any;
  airlineId:any;
  flights:any;
  copy:any;  
  displayStyle="none";

 

  openPopup(item:any){
    console.log(item);
    this.displayStyle="block";
    this.bookticketForm.controls['ScheduleId'].setValue(item.flightScheduleId);
    this.bookticketForm.controls['FromPlace'].setValue(item.fromPlace);
    this.bookticketForm.controls['ToPlace'].setValue(item.toPlace);
    this.bookticketForm.controls['StartDateTime'].setValue(item.startDateTime);
    this.bookticketForm.controls['EndDateTime'].setValue(item.endDateTime);
    this.bookticketForm.controls['AirlineId'].setValue(item.airLineId);
    this.bookticketForm.controls['EmailId'].setValue(localStorage.getItem('email'));
    //this.bookticketForm.controls['EmailId'].disable();
  }
  closePopup(){
    this.displayStyle="none";
  }

  ngOnInit(): void {
   this. bookticketForm = new FormGroup({
      AirlineId: new FormControl('',Validators.required),
      //BoardingTime: new FormControl('',Validators.required),
      UserName: new FormControl('',Validators.required),
      EmailId: new FormControl('',Validators.required),
      NoOfSeats:new FormControl(0,Validators.required),
      DetailsOfPassenger: new FormControl('',Validators.required),
      MealOption: new FormControl('',Validators.required),
      SeatNUmbers: new FormControl('',Validators.required),
      FromPlace: new FormControl('',Validators.required),
      ToPlace: new FormControl('',Validators.required),
      airline: new FormControl('',Validators.required),
      StartDateTime:new FormControl('',Validators.required),
      EndDateTime:new FormControl('',Validators.required),
      Price:new FormControl(0,Validators.required),
      ScheduleId:new FormControl('',Validators.required)

     
  
    });

    this.auth.getAirlines().subscribe((data:any)=>{
      console.log(data);
      this.airlineList=data;
     },(error:HttpErrorResponse)=>{
       alert(error);
        console.log(error.error);
     });

     this.auth.GetSchedules().subscribe((data:any)=>{
     
      if(data != null){
        this.flights = data;
      }
     },(error:HttpErrorResponse)=>{
       alert(error);
        console.log(error.error);
     });
  }

  selected(){
    this.airlineId=this.airline;
    //alert(this.airline);
  }

  BookTicket(data:any){
   console.log(data);
   //alert(data.EmailId);
   //return;
    this.bookservice.BookFlight(data).subscribe((res:any) => {console.log(res)  
         alert("ticket booked");
         this.bookticketForm.reset();
         this.displayStyle="none";
        },(error:HttpErrorResponse)=>{
          console.log(error);
          this.bookticketForm.reset();
          this.displayStyle="none";
        }
      );
  }

}
