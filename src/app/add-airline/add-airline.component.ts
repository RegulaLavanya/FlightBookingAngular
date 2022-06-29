import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form,Validators,FormControl,FormBuilder} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
 
  constructor(private formBuilder:FormBuilder,
    private authService: AuthServiceService) { }

  airline:any;
  submitted:any;
  responseData:any;
  airlineList:any;

  get f() { return this.airline.controls; }
  
  onAirlineSubmit(){
    if(this.airline.invalid){
      return;
    }

    this.authService.RegisterAirline(this.airline.controls['airlineName'].value)
    .subscribe((data:any)=>{
       console.log(data);
       this.airline.reset();
       this.responseData=data.airlineName+"  added!";
       alert( this.responseData);
       this.GetAirlines();
       this.responseData="";
      },(error:HttpErrorResponse)=>{
         console.log(error.error);
         this.airline.reset();
         this.responseData=error.error;

         
         
      });
  }

  ngOnInit(): void
   {
      this.responseData="";

    this.airline=this.formBuilder.group({
      airlineName :['',Validators.required],
     
    })

    this.submitted=false;

    this.GetAirlines();

  
  }

  GetAirlines(){
  this.authService.getAllAirlines().subscribe((data:any)=>{
    console.log(data);
    this.airlineList=data;
   },(error:HttpErrorResponse)=>{
    // alert(error);
      console.log(error.error);
   });
  }

}
