import { IdentityUser } from './identity-user.model';

export interface CarMeetListRecord {
  meetId: number;
  meetName: string;
  meetDate: string;
  meetTime: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  lat: number;
  long: number;
  userLat: number;
  userLong: number;
}

export interface CarMeetDetails {
  meetId: number;
  meetName: string;
  meetDate: string;
  meetTime: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  lat: number;
  long: number;
  createdBy: string;
  isOwner: boolean;
  isRSVP: boolean;
  currentUserId: number;
}

export interface RSVPClient {
  clientId: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  city: string;
  state: string;
  identityUserId: string;
  identityUser?: IdentityUser;
  meetId: number;
  hasCar: boolean;
}

export interface ClientCarListRecord {
  carId: number;
  make: string;
  model: string;
  year: number;
  avgRating: number;
  garageId: number;
}

export interface CarMeetCar {
  carId: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  mods: string;
  avgRating: number;
  meetId: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
}
