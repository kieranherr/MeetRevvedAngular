import { CarMeet } from './car-meet.model';
import { Client } from './client.model';

export interface ClientMeet {
  clientMeetId: number;
  meetId: number;
  carMeet?: CarMeet;
  clientId: number;
  client?: Client;
}
