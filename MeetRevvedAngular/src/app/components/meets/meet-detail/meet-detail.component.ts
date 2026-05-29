import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';
import { CarMeetDetails } from 'src/app/models/view-models.model';

declare const google: any;

@Component({
  selector: 'app-meet-detail',
  templateUrl: './meet-detail.component.html',
})
export class MeetDetailComponent implements OnInit {
  meet: CarMeetDetails | null = null;
  loading = true;
  error: string | null = null;
  meetId!: number;

  constructor(
    private meetService: MeetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetId = Number(this.route.snapshot.paramMap.get('meetId'));
    this.meetService.getById(this.meetId).subscribe({
      next: meet => {
        this.meet = meet;
        this.loading = false;
        this.loadGoogleMaps(() => this.initMap(meet.lat, meet.long));
      },
      error: () => {
        this.error = 'Could not load meet details.';
        this.loading = false;
      }
    });
  }

  toggleRSVP(): void {
    if (!this.meet) return;
    if (this.meet.isRSVP) {
      this.meetService.deleteRSVP(this.meetId).subscribe(() => {
        this.meet!.isRSVP = false;
      });
    } else {
      this.meetService.setRSVP(this.meetId).subscribe(() => {
        this.meet!.isRSVP = true;
      });
    }
  }

  sendSOS(): void {
    if (!confirm('Send SOS alert to all attendees?')) return;
    this.meetService.sendSOS(this.meetId).subscribe({
      next: () => alert('SOS sent!'),
      error: () => alert('Failed to send SOS.')
    });
  }

  goToRSVPIndex(): void {
    this.router.navigate(['/meets', this.meetId, 'rsvps']);
  }

  goToTopThree(): void {
    this.router.navigate(['/meets', this.meetId, 'top-three']);
  }

  goToComments(): void {
    this.router.navigate(['/meets', this.meetId, 'comments']);
  }

  editMeet(): void {
    this.router.navigate(['/meets', this.meetId, 'edit']);
  }

  deleteMeet(): void {
    this.router.navigate(['/meets', this.meetId, 'delete']);
  }

  goBack(): void {
    this.router.navigate(['/meets']);
  }

  private loadGoogleMaps(callback: () => void): void {
    if (typeof google !== 'undefined' && google.maps) {
      callback();
      return;
    }
    (window as any)['initDetailMapCallback'] = callback;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initDetailMapCallback&v=weekly';
    script.async = true;
    document.head.appendChild(script);
  }

  private initMap(lat: number, lng: number): void {
    const center = { lat, lng };
    const map = new google.maps.Map(document.getElementById('detail-map'), {
      zoom: 14,
      center,
    });
    new google.maps.Marker({ position: center, map, title: this.meet?.meetName });
  }
}
