import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['./login']);
  }
}
