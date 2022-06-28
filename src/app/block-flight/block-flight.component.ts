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
  searchres=false;
  airlineList:any=[];
  active =1;
  inActive=0;
 
  ngOnInit(): void {
    this.blockFlightForm = new FormGroup({
      scheduleId: new FormControl('',Validators.required),
    });
    this.GetAirlineData()
  
  }
 
  GetAirlineData(){
    this.auth.getAllAirlines().subscribe((data:any)=>{
      this.searchres=true;
      console.log(data);
      this.airlineList=data;
     },(error:HttpErrorResponse)=>{
      // alert(error);
        console.log(error.error);
     });
  }
  blockFlight(data:any){
   // alert(data);
    console.log(data);
   
    this.auth.BlockAirline(data).subscribe((data:any)=>{
      console.log(data);
      this.GetAirlineData()
      this.blockFlightForm.reset();
      alert("success!");
      //if(data.isActive == 0)
      //this.responseMsg ="Airline blocked!";
     },(error:HttpErrorResponse)=>{
        console.log(error);
        this.responseMsg =error.error;
        this.blockFlightForm.reset();
        
     });
    }

}
