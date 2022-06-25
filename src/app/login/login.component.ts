import { Component, OnInit } from '@angular/core';
import { Form,Validators,FormControl,FormBuilder} from '@angular/forms';
import { CustomvalidationService } from '../services/customvalidation.service';
import { AuthServiceService } from '../auth-service.service';
import { BookingServiceService } from '../booking-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrationForm:any;
  submitted:any;
  responseMsg:any;
  constructor(private formBuilder:FormBuilder, 
     private customValidator: CustomvalidationService,
     private authservice:AuthServiceService,
     private bookingservice:BookingServiceService,public router:Router) {
  
   }

   get f() { return this.registrationForm.controls; }

   onRegSubmit(){
    this.submitted=true;
    if(this.registrationForm.invalid){
      //alert("please fill in")
      return;
    }
  //  alert(this.registrationForm.controls['email'].value+"--"+this.registrationForm.controls['pwd'].value);
   // alert("from register!"+JSON.stringify(this.registrationForm.value,null,4));


   this.authservice.ValidateLogin(this.registrationForm.controls['email'].value,
    this.registrationForm.controls['pwd'].value)
    .subscribe((data:any)=>{
       console.log(data);
       if(data.adminLogin.role == "1")
          localStorage.setItem("Role","Admin");
       else if(data.adminLogin.role == "2")
          localStorage.setItem("Role","User");
       localStorage.setItem("email",data.adminLogin.email);
       localStorage.setItem("token",data.token);

       if(localStorage.getItem("Role") == "Admin")
           this.router.navigate(['./admin']);
       else if(localStorage.getItem("Role") == "User")
            this.router.navigate(['./userHome']);
       

      },(error:HttpErrorResponse)=>{
         console.log(error);
        // alert(error.error);
         this.responseMsg =error.error;
         
      });

    /*  this.bookingservice.Getpnrdata().subscribe((data:any)=>{
        // this.data=data;
         console.log(data);*/

       /*  this.bookingservice.GetBookingHistoryByEmail('ashok@gmail.com').subscribe((data:any)=>{
          // this.data=data;
           console.log(data.bookingDetails);
           console.log(data.schedData);
           
          });*/


 

  }

    ngOnInit(): void 
      {

          this.registrationForm=this.formBuilder.group({
           // uname :['',Validators.required],
            email:['',[Validators.email,Validators.required]],
            pwd:['',[Validators.required,Validators.minLength(5)]]
          })

          this.submitted=false;

          this.responseMsg = "";

      }
}
