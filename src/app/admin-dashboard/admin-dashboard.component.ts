import { Component, OnInit } from '@angular/core';
import { MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  showVar: boolean = true;

  toggleAirline(){
      this.showVar = !this.showVar;
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['./login']);
  }

}
