import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  scheduleForm:any;
  airline:any;
  airlineId:any;
  airlineList:any;

  selected(){
    this.airlineId=this.airline;
    //alert(this.airline);
  }
  constructor(private auth:AuthServiceService) { }

  ngOnInit(): void {
    this.scheduleForm = new FormGroup({
      FlightId: new FormControl('',Validators.required),
      AirLineId: new FormControl('',Validators.required),
      FromPlace: new FormControl('',Validators.required),
      ToPlace: new FormControl('',Validators.required),
      StartDateTime: new FormControl('',Validators.required),
      EndDateTime: new FormControl('',Validators.required),
      TotalSeats: new FormControl(0,Validators.required),
      BusinessClassSeats: new FormControl(0,Validators.required),
      NonBusinessClassSeats: new FormControl(0,Validators.required),
      BusinessTicketCost: new FormControl(0,Validators.required),
      NonBusinessTicketCost: new FormControl(0,Validators.required),
      MealOption: new FormControl(0,Validators.required)
  
    });

   /* this.auth.getAirlines().subscribe((data:any)=>{
      console.log(data);
      this.airlineList=data;
     },(error:HttpErrorResponse)=>{
       alert(error);
        console.log(error.error);
     });*/
  }

  Schedule(data:any){
    this.auth.AddSchedule(data).subscribe((data:any)=>{
      console.log(data);
     alert("schedule added!");
     this.scheduleForm.reset();
     },(error:HttpErrorResponse)=>{
        console.log(error);
     });
  }

}
