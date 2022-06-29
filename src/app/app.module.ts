import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { MatMenuModule} from '@angular/material/menu';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { BlockFlightComponent } from './block-flight/block-flight.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { GetTicketDetailsComponent } from './get-ticket-details/get-ticket-details.component';
import { ManageDiscountsComponent } from './manage-discounts/manage-discounts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AdminDashboardComponent,
    AddAirlineComponent,
    AddFlightComponent,
    AddScheduleComponent,
    BlockFlightComponent,
    UserHomeComponent,
    BookingHistoryComponent,
    SearchFlightComponent,
    BookFlightComponent,
    ManageBookingsComponent,
    GetTicketDetailsComponent,
    ManageDiscountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule
    
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
