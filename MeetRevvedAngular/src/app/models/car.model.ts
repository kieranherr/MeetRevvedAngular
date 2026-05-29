import { IdentityUser } from './identity-user.model';

export interface Car {
  carId: number;
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  mods: string;
  imageLocation: string;
  avgRating: number;
  identityUserId: string;
  identityUser?: IdentityUser;
}
