import { Component, OnInit } from '@angular/core';
import { Form,Validators,FormControl,FormBuilder} from '@angular/forms';
import { CustomvalidationService } from '../services/customvalidation.service';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  title = 'FlightBookingUI';
  registrationForm:any;
  submitted:any;
  responseMsg:any;
  loginBut=false;

  constructor(private formBuilder:FormBuilder, 
     private customValidator: CustomvalidationService,
     private authservice:AuthServiceService,
     public router:Router) {
  
   }

   get f() { return this.registrationForm.controls; }

   onRegSubmit(){
    this.submitted=true;
    
    if(this.registrationForm.invalid){
      //alert("please fill in")
      return;
    }
   // alert(this.registrationForm.controls['email'].value+"--"+this.registrationForm.controls['pwd'].value);
    //alert("from register!"+JSON.stringify(this.registrationForm.value,null,4));

   this.authservice.RegisterUser(this.registrationForm.controls['uname'].value,this.registrationForm.controls['email'].value,
    this.registrationForm.controls['pwd'].value)
    //this.authservice.ValidateLogin(JSON.stringify(this.registrationForm.value))
    .subscribe((data:any)=>{
       console.log(data);
       if(data.name !==null){
            alert("User Registration Done! Login with credentials");
            this.responseMsg ="User Registration Done!"
             this.router.navigate(['./login']);
       }
       this.loginBut=true;
     
      },(error:HttpErrorResponse)=>{
        console.log(error);
       // alert(error.error);
        this.responseMsg =error.error;
        
     });

  }

    ngOnInit(): void 
      {

          this.registrationForm=this.formBuilder.group({
            uname :['',Validators.required],
            email:['',[Validators.email,Validators.required]],
            pwd:['',[Validators.required]],
            confirmPwd:['',[Validators.required,Validators.minLength(5)]]
          },
          {
            validator: this.customValidator.MatchPassword('pwd', 'confirmPwd'),
          }
          
          
          )

          this.submitted=false;

      }
}
