import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

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

 url="http://localhost:51209/";
 RegisterUserURL="http://localhost:51209/user-register";
 ValidateLoginURL="http://localhost:51209/login";
 RegisterAirlineURL="http://localhost:51209/airline-register";
 GetAirlinesURL="http://localhost:51209/GetAirlines";
 RegisterFlightURL="http://localhost:51209/Flightregister";
 BlockAirlineURL="http://localhost:51209/block";
 AddScheduleURL="http://localhost:51209/airline-add";
 searchFlightURL="http://localhost:51209/flightsearch";
 GetSchedulesURL="http://localhost:51209/GetSchedules";


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
    console.log(this.headerswithbearer);
    return this.http.post(this.RegisterAirlineURL, body,this.headerswithbearer);
  }

  getAirlines():Observable<any>{
   // let url=this.url+"GetAirlines";
    return this.http.get(this.GetAirlinesURL,this.headerswithbearer);
  }

  RegisterFlight(flightName:any,airlineId:any):Observable<any>{
    //let url=this.url+"Flightregister";
    let body =  JSON.stringify({ FlightName:flightName,AirlineId:airlineId});
    console.log(body);
    return this.http.post(this.RegisterFlightURL, body,this.headerswithbearer);
  }

  BlockAirline(scheduleId:any):Observable<any>{
    //let url=this.url+"block";

    let body =  JSON.stringify({ Id:scheduleId});
    console.log(body);
    
    return this.http.post(this.BlockAirlineURL, body,this.headerswithbearer);
  }

  AddSchedule(schedData:any):Observable<any>{
    //let url=this.url+"airline-add";
    let body =  JSON.stringify(schedData);
    console.log(body);
    
    return this.http.post(this.AddScheduleURL, body,this.headerswithbearer);
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
    
    return this.http.post(this.searchFlightURL, body,this.headerswithbearer);
  }

  GetSchedules():Observable<any>{
  
    //let url=this.url+"GetSchedules";
    return this.http.get(this.GetSchedulesURL,this.headerswithbearer);
  }

  
  
}
