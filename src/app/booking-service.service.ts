import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http:HttpClient) { }
  data:any;
  headers={headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType':'application/json',
        'Authorization':'Bearer '+localStorage.getItem("token")
      })};
  url="http://localhost:51209/";

  Getpnrdata():Observable<any>{
          let url=this.url+"ticket/tXHIaOu8";
          let res=this.http.get(url);
          alert(res);
          return res;
        }

  GetBookingHistoryByEmail(Email:string){
        let url=this.url+"bookinghistory/"+Email;
        console.log(typeof(this.headers));
        let res=this.http.get(url,this.headers);
        return res;
  }

  BookFlight(scheduleid:number):Observable<any>{
    let url=this.url+scheduleid+"/booking";
   let body ={};
    this.http.post(url, body,this.headers).subscribe(data => 
      {
        this.data=data;
      },
      (error:HttpErrorResponse)=>{
      alert("Error in flight booking");
      }
    
    );
    return (this.data);
  }

  CancelBooking(data:any){
      let url=this.url+"cancelbooking/"+data.pnr;
      return this.http.delete(url,this.headers);
    }
}
