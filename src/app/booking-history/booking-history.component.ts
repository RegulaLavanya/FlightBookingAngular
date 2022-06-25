import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookingServiceService } from '../booking-service.service';
import {  ViewChild, ElementRef } from '@angular/core';  
import { jsPDF} from 'jspdf';  
import 'jspdf-autotable';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  ticketHistory:any = [];
  data1:any;
  displayStyle="none";
  newdata1:any;

  openPopup(item:any){
    this.displayStyle="block";
    console.log(item);
    this.newdata1=[[item.airLineId,item.fromPlace,item.toPlace,item.startDateTime,item.seatNUmbers,item.price,item.pnr]]
    this.createPdf();
  }

  closePopup(){
    this.displayStyle="none";
  }
  constructor(private booking:BookingServiceService) {

   }

   head = [['Airline ID', 'Source', 'Destination', 'Boarding Time','Seat Numbers','Price','PNR']]

  ngOnInit(): void {
    this.bookingHistory(localStorage.getItem('email'));
  }

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Ticket Details', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head:  this.head,
      body:  this.newdata1,
      theme: 'plain',
      didDrawCell: (data:any) => {
        console.log(data.column.index)
      }
    })
    // below line for Open PDF document in new tab
   // doc.output('dataurlnewwindow')
    // below line for Download PDF document  
    doc.save('TicketDetails.pdf');
  }


  bookingHistory(data:any){
   this.booking.GetBookingHistoryByEmail(data).subscribe((res:any) => {console.log(res)
        this.ticketHistory=res;
      },(error:HttpErrorResponse)=>{
       console.log( error);
      }
    );
  }

}
