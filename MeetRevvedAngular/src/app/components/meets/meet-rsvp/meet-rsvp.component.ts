import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';
import { CarMeetDetails } from 'src/app/models/view-models.model';

@Component({
  selector: 'app-meet-rsvp',
  templateUrl: './meet-rsvp.component.html',
})
export class MeetRsvpComponent implements OnInit {
  meet: CarMeetDetails | null = null;
  meetId!: number;
  loading = true;
  submitting = false;
  error: string | null = null;

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
      },
      error: () => {
        this.error = 'Could not load meet.';
        this.loading = false;
      }
    });
  }

  confirmRSVP(): void {
    this.submitting = true;
    this.meetService.setRSVP(this.meetId).subscribe({
      next: () => this.router.navigate(['/meets', this.meetId]),
      error: () => {
        this.error = 'Failed to RSVP. Please try again.';
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meets']);
  }
}
