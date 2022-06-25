import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-block-flight',
  templateUrl: './block-flight.component.html',
  styleUrls: ['./block-flight.component.css']
})
export class BlockFlightComponent implements OnInit {


  constructor(private auth:AuthServiceService) { }

  blockFlightForm:any;
  responseMsg:any;
 
  ngOnInit(): void {
    this.blockFlightForm = new FormGroup({
      scheduleId: new FormControl('',Validators.required),
    });
  }

  blockFlight(data:any){
    this.auth.BlockAirline(data.scheduleId).subscribe((data:any)=>{
      console.log(data);
      this.blockFlightForm.reset();
      if(data.isActive == 0)
      this.responseMsg ="Airline blocked!";
     },(error:HttpErrorResponse)=>{
        console.log(error);
        this.responseMsg =error.error;
        this.blockFlightForm.reset();
        
     });
    }

}
