import { Car } from './car.model';
import { Client } from './client.model';
import { IdentityUser } from './identity-user.model';

export interface Garage {
  garageId: number;
  clientId: number;
  client?: Client;
  carId: number;
  car?: Car;
  identityUserId: string;
  identityUser?: IdentityUser;
}
