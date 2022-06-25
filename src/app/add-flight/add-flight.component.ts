import { Component, OnInit ,Input} from '@angular/core';
import { Form,Validators,FormControl,FormBuilder} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  
  constructor(private formBuilder:FormBuilder,
    private authservice:AuthServiceService) { 
    
    }

  flight:any;
  submitted:any;
  airline:any;
  airlineList:any;
  airlineId:any;
  responseData:any;

  get f() { return this.flight.controls; }
  
  onflightSubmit(){
    if(this.flight.invalid){
      //alert("please fill in")
      return;
    }
    //alert(this.flight.controls['flightName'].value);
    this.authservice.RegisterFlight(this.flight.controls['flightName'].value,this.airlineId)
    .subscribe((data:any)=>{
       console.log(data);
      // alert(data.flightName);
      this.flight.reset();
       this.responseData=data.flightName+"  added!";
      },(error:HttpErrorResponse)=>{
       // alert(error);
         console.log(error.error);
         this.responseData=error.error;
      });
  }

  selected(){
    this.airlineId=this.airline;
    //alert(this.airline);
  }

  ngOnInit(): void {
    this.flight=this.formBuilder.group({
      flightName :['',Validators.required],
      airline:['',Validators.required]
     
    })

    this.submitted=false;

    this.authservice.getAirlines().subscribe((data:any)=>{
      console.log(data);
      this.airlineList=data;
     },(error:HttpErrorResponse)=>{
       alert(error);
        console.log(error.error);
     });
  }


}
