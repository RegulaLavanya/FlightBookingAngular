import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  constructor(private auth:AuthServiceService) { }
  searchForm:any;
  flights:any;
  searchres=false;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      FromPlace: new FormControl('',Validators.required),
      ToPlace: new FormControl('',Validators.required),
      StartDateTime: new FormControl('',Validators.required),
      EndDateTime:new FormControl('',Validators.required),
    });
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

}
