import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';

@Component({
  selector: 'app-meet-edit',
  templateUrl: './meet-edit.component.html',
})
export class MeetEditComponent implements OnInit {
  form: FormGroup;
  meetId!: number;
  loading = true;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private meetService: MeetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      meetName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.maxLength(2)]],
      zip: ['', Validators.required],
      meetTime: ['', Validators.required],
      meetDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.meetId = Number(this.route.snapshot.paramMap.get('meetId'));
    this.meetService.getById(this.meetId).subscribe({
      next: meet => {
        this.form.patchValue({
          meetName: meet.meetName,
          street: meet.street,
          city: meet.city,
          state: meet.state,
          zip: meet.zip,
          meetTime: meet.meetTime,
          meetDate: meet.meetDate,
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load meet.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.meetService.update(this.meetId, this.form.value).subscribe({
      next: () => this.router.navigate(['/meets', this.meetId]),
      error: () => {
        this.error = 'Failed to update meet. Please try again.';
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meets', this.meetId]);
  }
}
