import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';
import { CarMeetListRecord } from 'src/app/models/view-models.model';

declare const google: any;

@Component({
  selector: 'app-meet-list',
  templateUrl: './meet-list.component.html',
})
export class MeetListComponent implements OnInit, OnDestroy {
  meets: CarMeetListRecord[] = [];
  loading = true;
  error: string | null = null;
  zipInput = '';

  private map: any = null;
  private geocoder: any = null;

  constructor(private meetService: MeetService, private router: Router) {}

  ngOnInit(): void {
    this.meetService.getAll().subscribe({
      next: meets => {
        this.meets = meets;
        this.loading = false;
        this.loadGoogleMaps(() => this.initMap(meets));
      },
      error: () => {
        this.error = 'Could not load meets.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.map = null;
  }

  goToDetails(meetId: number): void {
    this.router.navigate(['/meets', meetId]);
  }

  createMeet(): void {
    this.router.navigate(['/meets/create']);
  }

  searchByZip(): void {
    if (!this.zipInput || !this.geocoder) return;
    this.geocoder.geocode({ address: this.zipInput }, (results: any, status: string) => {
      if (status === 'OK' && results.length > 0) {
        const loc = results[0].geometry.location;
        this.initMap(this.meets, { lat: loc.lat(), lng: loc.lng() });
      } else {
        alert('Could not find location for that zip code.');
      }
    });
  }

  private loadGoogleMaps(callback: () => void): void {
    if (typeof google !== 'undefined' && google.maps) {
      this.geocoder = new google.maps.Geocoder();
      callback();
      return;
    }
    (window as any)['initMapCallback'] = () => {
      this.geocoder = new google.maps.Geocoder();
      callback();
    };
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMapCallback&v=weekly';
    script.async = true;
    document.head.appendChild(script);
  }

  private initMap(meets: CarMeetListRecord[], center?: { lat: number; lng: number }): void {
    const defaultCenter = meets.length > 0
      ? { lat: meets[0].userLat, lng: meets[0].userLong }
      : { lat: 39.5, lng: -98.35 };

    const mapCenter = center ?? defaultCenter;

    this.map = new google.maps.Map(document.getElementById('meet-map'), {
      zoom: 11,
      center: mapCenter,
    });

    const infoWindow = new google.maps.InfoWindow();

    meets.forEach((meet, i) => {
      const marker = new google.maps.Marker({
        position: { lat: meet.lat, lng: meet.long },
        map: this.map,
        title: meet.meetName,
        label: (i + 1).toString(),
      });
      marker.addListener('click', () => {
        infoWindow.close();
        infoWindow.setContent(meet.meetName);
        infoWindow.open(this.map, marker);
      });
    });
  }
}
