import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/auth/auth.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ProfileComponent } from './components/profile/profile/profile.component';
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GarageDetailComponent } from './components/garages/garage-detail/garage-detail.component';
import { GarageCreateComponent } from './components/garages/garage-create/garage-create.component';
import { GarageEditComponent } from './components/garages/garage-edit/garage-edit.component';
import { GarageDeleteComponent } from './components/garages/garage-delete/garage-delete.component';
import { FriendIndexComponent } from './components/garages/friend-index/friend-index.component';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { CarCreateComponent } from './components/cars/car-create/car-create.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarEditComponent } from './components/cars/car-edit/car-edit.component';
import { CarDeleteComponent } from './components/cars/car-delete/car-delete.component';
import { CarRateComponent } from './components/cars/car-rate/car-rate.component';
import { ClientCarListComponent } from './components/cars/client-car-list/client-car-list.component';
import { ClientCarDetailComponent } from './components/cars/client-car-detail/client-car-detail.component';
import { CarTopThreeComponent } from './components/cars/car-top-three/car-top-three.component';
import { MeetListComponent } from './components/meets/meet-list/meet-list.component';
import { MeetDetailComponent } from './components/meets/meet-detail/meet-detail.component';
import { MeetCreateComponent } from './components/meets/meet-create/meet-create.component';
import { MeetEditComponent } from './components/meets/meet-edit/meet-edit.component';
import { MeetDeleteComponent } from './components/meets/meet-delete/meet-delete.component';
import { MeetRsvpComponent } from './components/meets/meet-rsvp/meet-rsvp.component';
import { RsvpIndexComponent } from './components/meets/rsvp-index/rsvp-index.component';
import { CommentIndexComponent } from './components/meets/comment-index/comment-index.component';
import { CommentCreateComponent } from './components/meets/comment-create/comment-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ProfileCreateComponent,
    ProfileEditComponent,
    GarageDetailComponent,
    GarageCreateComponent,
    GarageEditComponent,
    GarageDeleteComponent,
    FriendIndexComponent,
    CarListComponent,
    CarCreateComponent,
    CarDetailComponent,
    CarEditComponent,
    CarDeleteComponent,
    CarRateComponent,
    ClientCarListComponent,
    ClientCarDetailComponent,
    CarTopThreeComponent,
    MeetListComponent,
    MeetDetailComponent,
    MeetCreateComponent,
    MeetEditComponent,
    MeetDeleteComponent,
    MeetRsvpComponent,
    RsvpIndexComponent,
    CommentIndexComponent,
    CommentCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
