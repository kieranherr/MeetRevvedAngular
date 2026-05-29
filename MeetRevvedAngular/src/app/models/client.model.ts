import { IdentityUser } from './identity-user.model';

export interface Client {
  clientId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  city: string;
  state: string;
  identityUserId: string;
}
