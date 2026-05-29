import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
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


const routes: Routes = [
  { path: 'login',
    component: LoginComponent },
  { path: 'profile',
    component: ProfileComponent },
  { path: 'profile/create',
    component: ProfileCreateComponent },
  { path: 'profile/edit',
    component: ProfileEditComponent },
  { path: 'garages',
    component: GarageDetailComponent },
  { path: 'garages/create',
    component: GarageCreateComponent },
  { path: 'garages/edit/:id',
    component: GarageEditComponent },
  { path: 'garages/delete/:id',
    component: GarageDeleteComponent },
  { path: 'friends',
    component: FriendIndexComponent },
  { path: 'cars',
    component: CarListComponent },
  { path: 'cars/create',
    component: CarCreateComponent },
  { path: 'cars/:id',
    component: CarDetailComponent },
  { path: 'cars/edit/:id',
    component: CarEditComponent },
  { path: 'cars/delete/:id',
    component: CarDeleteComponent },
  { path: 'cars/rate/:id',
    component: CarRateComponent },
  { path: 'cars/client/garage/:garageId',
    component: ClientCarListComponent },
  { path: 'cars/client/:id',
    component: ClientCarDetailComponent },
  { path: 'meets/:meetId/top-three',
    component: CarTopThreeComponent },
  { path: 'meets',
    component: MeetListComponent },
  { path: 'meets/create',
    component: MeetCreateComponent },
  { path: 'meets/:meetId',
    component: MeetDetailComponent },
  { path: 'meets/:meetId/edit',
    component: MeetEditComponent },
  { path: 'meets/:meetId/delete',
    component: MeetDeleteComponent },
  { path: 'meets/:meetId/rsvp',
    component: MeetRsvpComponent },
  { path: 'meets/:meetId/rsvps',
    component: RsvpIndexComponent },
  { path: 'meets/:meetId/comments',
    component: CommentIndexComponent },
  { path: 'meets/:meetId/comments/create',
    component: CommentCreateComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
