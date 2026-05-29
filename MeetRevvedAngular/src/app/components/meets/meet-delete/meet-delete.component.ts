import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';
import { CarMeetDetails } from 'src/app/models/view-models.model';

@Component({
  selector: 'app-meet-delete',
  templateUrl: './meet-delete.component.html',
})
export class MeetDeleteComponent implements OnInit {
  meet: CarMeetDetails | null = null;
  meetId!: number;
  loading = true;
  deleting = false;
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

  confirmDelete(): void {
    this.deleting = true;
    this.meetService.delete(this.meetId).subscribe({
      next: () => this.router.navigate(['/meets']),
      error: () => {
        this.error = 'Failed to delete meet.';
        this.deleting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meets', this.meetId]);
  }
}
