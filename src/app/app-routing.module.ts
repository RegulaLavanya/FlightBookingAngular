import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { LoginComponent } from './login/login.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { BlockFlightComponent } from './block-flight/block-flight.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';


const routes: Routes = [
  {
    path:'bookingHistory',component:BookingHistoryComponent
  },
  {
    path:'manageBookings',component:ManageBookingsComponent
  },
  {
    path:'bookFlight',component:BookFlightComponent
  },
  {
    path:'searchFlight',component:SearchFlightComponent
  },
  {
    path:'addflight',component:AddFlightComponent
  },
  {
    path:'airline',component:AddAirlineComponent
  },
  {
    path:'register',component:RegistrationComponent
  },
  {
    path:'admin',component:AdminDashboardComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'addSchedule',component:AddScheduleComponent
  },
  {
    path:'blockFlight',component:BlockFlightComponent
  },
  {
    path:'userHome',component:UserHomeComponent
  },
 
  {
    path:'',component:LoginComponent
    //LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
