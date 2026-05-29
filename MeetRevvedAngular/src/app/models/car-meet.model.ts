import { IdentityUser } from './identity-user.model';

export interface CarMeet {
  meetId: number;
  meetName: string;
  lat: number;
  long: number;
  street: string;
  city: string;
  state: string;
  zip: number;
  meetTime: string;
  meetDate: string;
  identityUserId: string;
  identityUser?: IdentityUser;
}
