import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css']
})
export class ManageDiscountsComponent implements OnInit {

  constructor(private auth:AuthServiceService) { }

  discountForm:any;
  discounts:any=[];
  submitted:any=false;

  ngOnInit(): void {
    this.discountForm = new FormGroup({
      DiscountCoupon: new FormControl('',Validators.required),
      Amount: new FormControl('',Validators.required),
    });

    this.getDiscount();
  }

  get f() { return this.discountForm.controls; }

  onAdd(data:any){
   // this.submitted=true;
    if(this.discountForm.invalid){
      //alert("please fill in")
      return;
    }
    this.auth.AddDiscounts(data).subscribe((res:any) => {console.log(res)
      alert("success");
      /*if(res != null){
        this.discounts = res;
      }*/
     
      this.getDiscount();
      this.discountForm.reset();
    },
    (error:HttpErrorResponse)=>{
      console.log(error);
    }
  );}


  getDiscount(){
    this.auth.GetDiscounts().subscribe((res:any) => {console.log(res)
        if(res != null){
          this.discounts = res;
        }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

}
