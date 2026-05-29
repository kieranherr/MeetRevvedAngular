import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetService, CarMeetCreate } from 'src/app/services/meet.service';
import { AuthService } from '../../auth/auth.service';
import { CarMeet } from 'src/app/models/car-meet.model';

@Component({
  selector: 'app-meet-create',
  templateUrl: './meet-create.component.html',
})
export class MeetCreateComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  error: string | null = null;
  meetMerge: CarMeet = {} as CarMeet;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private meetService: MeetService,
    private router: Router,
    private authService: AuthService,
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

  mergeModel(formMeet: FormGroup): CarMeet {
    this.meetMerge.identityUserId = this.userId ?? '';
    this.meetMerge.meetName = formMeet.value.meetName;
    this.meetMerge.street = formMeet.value.street;
    this.meetMerge.city = formMeet.value.city;
    this.meetMerge.state = formMeet.value.state;
    this.meetMerge.zip = Number(formMeet.value.zip);
    this.meetMerge.meetTime = formMeet.value.meetTime;
    this.meetMerge.meetDate = formMeet.value.meetDate;
    return this.meetMerge;
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const mergedModel = this.mergeModel(this.form);
    this.meetService.create(mergedModel).subscribe({
      next: () => this.router.navigate(['/meets']),
      error: () => {
        this.error = 'Failed to create meet. Please try again.';
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meets']);
  }
}
