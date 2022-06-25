import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  constructor(private http:HttpClient) { }

  data:any;
  headers={headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType':'application/json'})}
}
