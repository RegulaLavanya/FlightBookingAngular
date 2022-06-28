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

  Getpnrdata(pnr:any):Observable<any>{
          let url=this.url+"ticket/"+pnr;
          let res=this.http.get(url);
         // alert(res);
          return res;
        }

  GetBookingHistoryByEmail(Email:string){
        let url=this.url+"bookinghistory/"+Email;
       let fheaders={headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
        })};
        console.log(typeof(this.headers));
        let res=this.http.get(url,fheaders);
        return res;
  }

  BookFlight(data:any):Observable<any>{
    let url=this.url+"booking";
    let body =  JSON.stringify(data);

    let headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'responseType':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
      })
    }
    
    return this.http.post(url, body,headers);
    
  }

  CancelBooking(data:any){
      let url=this.url+"cancelbooking/"+data.pnr;
      return this.http.delete(url,this.headers);
    }
}
