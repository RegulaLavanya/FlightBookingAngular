import { Component, OnInit } from '@angular/core';
import { Form,Validators,FormControl,FormBuilder} from '@angular/forms';
import { BookingServiceService } from '../booking-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {

  cancel:any;
  submitted:any;
  responseData:any;

  constructor(private formBuilder:FormBuilder,
    private bookingService: BookingServiceService) { }

    get f() { return this.cancel.controls; }

  ngOnInit(): void {
    this.cancel=this.formBuilder.group({
      pnr :['',Validators.required],
     
    })

    this.submitted=false;
  }
      onCancel(data:any){
 
      if(this.cancel.invalid){
        return;
      }

      this.bookingService.CancelBooking(data).subscribe((data:any)=>{
        console.log(data);
        this.responseData ="booking cancelled";
        this.cancel.reset();
       },(error:HttpErrorResponse)=>{
          console.log(error);
          this.responseData =error.error;
          
       });
      }

    

}
