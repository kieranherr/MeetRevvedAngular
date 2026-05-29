import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarMeetListRecord, CarMeetDetails, RSVPClient } from 'src/app/models/view-models.model';
import { Comment } from 'src/app/models/comment.model';
import { CarMeet } from '../models/car-meet.model';

export interface CarMeetCreate {
  meetName: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  meetTime: string;
  meetDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private readonly baseAPIUrl = 'https://localhost:7019/api/carmeets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CarMeetListRecord[]> {
    return this.http.get<CarMeetListRecord[]>(this.baseAPIUrl);
  }

  getById(meetId: number): Observable<CarMeetDetails> {
    return this.http.get<CarMeetDetails>(`${this.baseAPIUrl}/${meetId}`);
  }

  create(meet: CarMeet): Observable<CarMeetDetails> {
    return this.http.post<CarMeetDetails>(`${this.baseAPIUrl}/create`, meet);
  }

  update(meetId: number, meet: CarMeet): Observable<CarMeetDetails> {
    return this.http.put<CarMeetDetails>(`${this.baseAPIUrl}/${meetId}`, meet);
  }

  delete(meetId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/${meetId}`);
  }

  setRSVP(meetId: number): Observable<void> {
    return this.http.post<void>(`${this.baseAPIUrl}/${meetId}/rsvp`, {});
  }

  deleteRSVP(meetId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/${meetId}/rsvp`);
  }

  getRSVPClients(meetId: number): Observable<RSVPClient[]> {
    return this.http.get<RSVPClient[]>(`${this.baseAPIUrl}/${meetId}/rsvps`);
  }

  getComments(meetId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseAPIUrl}/${meetId}/comments`);
  }

  addComment(meetId: number, commentBody: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseAPIUrl}/${meetId}/comments`, { commentBody, meetId });
  }

  sendSOS(meetId: number): Observable<void> {
    return this.http.post<void>(`${this.baseAPIUrl}/${meetId}/sos`, {});
  }
}
