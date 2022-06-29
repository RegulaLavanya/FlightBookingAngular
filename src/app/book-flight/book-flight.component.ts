import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl,FormArray} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { BookingServiceService } from '../booking-service.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  constructor(private auth:AuthServiceService,
    private bookservice:BookingServiceService,private builder:FormBuilder) {
      this.passengerForm = this.builder.group({  
        passengers: this.builder.array([]) ,  
     });
    }

    
    searchForm:any;
    searchres=false;
  bookticketForm:any;
  airlineList:any;
  airline:any;
  airlineId:any;
  flights:any;
  copy:any;  
  displayStyle="none";
  discountsData:any=[];
  finalPrice:any;
  formPrice:any;
  discCoup:any;
  originalPrince:any;  
  passengerForm: FormGroup;  
  passengerDetails:any;
  Passengers() : FormArray {  
    return this.passengerForm.get("passengers") as FormArray  

  }  
     
    newQuantity(): FormGroup {  
      return this.builder.group({  
        Name: '',  
        Age: '',  
        Gender:''
      })  
    }  
       
    addQuantity() {  
      this.Passengers().push(this.newQuantity());  
    }  
       
    removeQuantity(i:number) {  
      this.Passengers().removeAt(i);  
    }  
       
    onSubmit() {  
      console.log(this.passengerForm.value);
    }
    SubmitPass(data:any)
    {
      this.passengerDetails=JSON.stringify(JSON.stringify(data.passengers));
      console.log( this.passengerDetails);
 // console.log(JSON.stringify(this.passengerDetails));
    }
 

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
    this.bookticketForm.controls['Price'].setValue(item.businessTicketCost);
    this.bookticketForm.controls['FlightName'].setValue(item.flightName); 
    this.originalPrince=this.bookticketForm.controls['Price'].value;
  }
  closePopup(){
    this.displayStyle="none";
    this.originalPrince=0;
    this.bookticketForm.reset();
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      FromPlace: new FormControl('',Validators.required),
      ToPlace: new FormControl('',Validators.required),
      StartDateTime: new FormControl('',Validators.required),
      EndDateTime:new FormControl('',Validators.required),
    });

   this.bookticketForm = new FormGroup({
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
      ScheduleId:new FormControl('',Validators.required),
      DiscountCoupon:new FormControl('',Validators.required),
      FlightName:new FormControl('',Validators.required)

     
  
    });

    this.auth.getAirlines().subscribe((data:any)=>{
      console.log(data);
      this.airlineList=data;
     },(error:HttpErrorResponse)=>{
       alert(error);
        console.log(error.error);
     });

     this.GetSchedules();

     this. getDiscount();
  
  }

  GetSchedules(){
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
  selectedCoupon(data:any){
   // this.discCoup=data;
    this.discCoup=data.split(':')[1];
    console.log( (this.discCoup));
    let noOfTickets=this.bookticketForm.controls['NoOfSeats'].value;
    //this.formPrice=this.bookticketForm.controls['Price'].value;
    this.finalPrice= (this.originalPrince*noOfTickets)-this.discCoup;
    this.bookticketForm.controls['Price'].setValue(this.finalPrice);
    console.log( this.formPrice+"--"+ this.finalPrice);
  }
  updatePrice(data:any){
 console.log(data);
 this.bookticketForm.controls['Price'].setValue(data.NoOfSeats*this.originalPrince);
  }

  getDiscount(){
    this.auth.GetDiscounts().subscribe((res:any) => {console.log(res)
        if(res != null){
          this.discountsData = res;
        }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }


 

  SearchFlight(data:any){
    console.log(data);
    this.flights=[];
    this.auth.searchFlight(data).subscribe((res:any) => {console.log(res)
      this.searchres =true;
        if(res != null){
          this.flights = res;
        }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  BookTicket(data:any){
   //alert( this.passengerDetails);
  //  this.bookticketForm.controls['DetailsOfPassenger'].setValue((JSON.stringify(this.passengerForm.get('passengers')?.value)));
  //  console.log(this.bookticketForm.value);
  //  this.bookticketForm.controls['DetailsOfPassenger'].setValue(JSON.stringify(JSON.stringify(this.passengerForm.get('passengers')?.value)));
    data.DetailsOfPassenger=JSON.stringify(JSON.stringify(this.passengerForm.get('passengers')?.value));
   console.log(data);
  // return;
    this.bookservice.BookFlight(data).subscribe((res:any) => {console.log(res)  
         alert("ticket booked");
         this.bookticketForm.reset();
         this.searchForm.reset();
         this.GetSchedules();
         this.displayStyle="none";
        },(error:HttpErrorResponse)=>{
          console.log(error);
          this.bookticketForm.reset();
          this.displayStyle="none";
        }
      );
  }

}
