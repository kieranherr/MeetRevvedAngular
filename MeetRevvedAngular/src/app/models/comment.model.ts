import { CarMeet } from './car-meet.model';

export interface Comment {
  commentId: number;
  commentorsName: string;
  commentBody: string;
  date: string;
  meetId: number;
  carMeet?: CarMeet;
}
