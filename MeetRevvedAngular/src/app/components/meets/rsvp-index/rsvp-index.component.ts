import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';
import { RSVPClient } from 'src/app/models/view-models.model';

@Component({
  selector: 'app-rsvp-index',
  templateUrl: './rsvp-index.component.html',
})
export class RsvpIndexComponent implements OnInit {
  clients: RSVPClient[] = [];
  meetId!: number;
  loading = true;
  error: string | null = null;

  constructor(
    private meetService: MeetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetId = Number(this.route.snapshot.paramMap.get('meetId'));
    this.meetService.getRSVPClients(this.meetId).subscribe({
      next: clients => {
        this.clients = clients;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load RSVPs.';
        this.loading = false;
      }
    });
  }

  viewCar(clientId: number): void {
    this.router.navigate(['/cars/client', clientId]);
  }

  addFriend(clientId: number): void {
    this.router.navigate(['/friends/add', clientId]);
  }

  goBack(): void {
    this.router.navigate(['/meets', this.meetId]);
  }
}
