import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,private router:Router) { }



 url="http://localhost:51209/";
 RegisterUserURL="https://authenticationservice20220628163005.azurewebsites.net/api/v1.0/flight/user/register";
 //"http://localhost:51209/user-register";
 ValidateLoginURL="https://authenticationservice20220628163005.azurewebsites.net/api/v1.0/flight/login";
 //"http://localhost:51209/login";
 RegisterAirlineURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/airline/register";
 //"http://localhost:51209/airline-register";
 GetAirlinesURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/GetAirlines";
 //"http://localhost:51209/GetAirlines";
 RegisterFlightURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/register";
 //"http://localhost:51209/Flightregister";
 BlockAirlineURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/block";
 //"http://localhost:51209/block";
 AddScheduleURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/airline/inventory/add";
 //http://localhost:51209/airline-add";
 searchFlightURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/search";
 //"http://localhost:51209/flightsearch";
 GetSchedulesURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/GetSchedule";
 //"http://localhost:51209/GetSchedules";
 GetDiscountsURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/GetDiscounts";
 //"http://localhost:51209/GetDiscounts";
 AddDiscountsURL="https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/AddDiscounts";
 //"http://localhost:51209/AddDiscounts";

 headers={
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType':'application/json'
  })
}

headerswithbearer={
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType':'application/json',
      'Authorization':'Bearer '+localStorage.getItem("token")
  })
}


  RegisterUser(name:any,email:any,password:any):Observable<any>{
    //let url=this.url+"user-register";

    let body =  JSON.stringify({Name:name, Email:email,Password:password});
    console.log(body);
    
    return this.http.post(this.RegisterUserURL, body,this.headers);
  }

  ValidateLogin(email:any,password:any):Observable<any>{
    //let url="http://localhost:51209/login";

    let body =  JSON.stringify({ Email:email,Password:password});
    console.log(body);
    
    return this.http.post(this.ValidateLoginURL, body,this.headers);
  }

  RegisterAirline(airlinename:any):Observable<any>{
    //let url=this.url+"airline-register";
    let body =  JSON.stringify({ AirlineName:airlinename});
    console.log("test"+this.headerswithbearer);
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    if(localStorage.getItem("token") == null)
      this.router.navigate(['./login']);
    return this.http.post(this.RegisterAirlineURL, body,headers);
  }

  getAirlines():Observable<any>{
   // let url=this.url+"GetAirlines";
   let headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType':'application/json',
        'Authorization':'Bearer '+localStorage.getItem("token")
    })
  }
    return this.http.get(this.GetAirlinesURL,headers);
  }

  getAllAirlines():Observable<any>{
    // let url=this.url+"GetAllAirlines";
     let url= "https://inventorymanagementservice20220628212243.azurewebsites.net/api/v1.0/flight/GetAllAirlines";
    let headers={
     headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'responseType':'application/json',
         'Authorization':'Bearer '+localStorage.getItem("token")
     })
   }
     return this.http.get(url,headers);
   }

  RegisterFlight(flightName:any,airlineId:any):Observable<any>{
    //let url=this.url+"Flightregister";
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    let body =  JSON.stringify({ FlightName:flightName,AirlineId:airlineId});
    console.log(body);
    return this.http.post(this.RegisterFlightURL, body,headers);
  }

  BlockAirline(scheduleId:any):Observable<any>{
    //let url=this.url+"block";
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
   // let body =  JSON.stringify({ Id:scheduleId});
    let body =  JSON.stringify(scheduleId);
    console.log(body);
    
    return this.http.post(this.BlockAirlineURL, body,headers);
  }

  AddSchedule(schedData:any):Observable<any>{
    //let url=this.url+"airline-add";
    let body =  JSON.stringify(schedData);
    console.log(body);
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    
    return this.http.post(this.AddScheduleURL, body,headers);
  }

  Book(schedData:any):Observable<any>{
    let url=this.url+"airline-add";
    let body =  JSON.stringify(schedData);
    console.log(body);
    
    return this.http.post(url, body,this.headerswithbearer);
  }

  searchFlight(data:any):Observable<any>{
   // let url=this.url+"flightsearch";
    let body =  JSON.stringify(data);
    console.log(body);
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    
    return this.http.post(this.searchFlightURL, body,headers);
  }

  GetSchedules():Observable<any>{
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    //let url=this.url+"GetSchedules";
    return this.http.get(this.GetSchedulesURL,headers);
  }

  GetDiscounts():Observable<any>{
    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.get(this.GetDiscountsURL,headers);
  }

  AddDiscounts(data:any):Observable<any>{
     let body =  JSON.stringify(data);
     console.log(body);
     let headers={
       headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'responseType':'application/json',
           'Authorization':'Bearer '+localStorage.getItem("token")
       })
     }
     return this.http.post(this.AddDiscountsURL, body,headers);
   }

  
  
}
