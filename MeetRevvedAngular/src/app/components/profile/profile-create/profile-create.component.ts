import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ClientSerivce } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
})
export class ProfileCreateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage = '';
  userId: string | null = null;
  client: Client = {} as Client;

  readonly states = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private clientService: ClientSerivce,
  ) {}

  getCurrentUserId(): void {
    this.userId = this.authService.getUserId();
  }

  mergeModel(formClient: Client): Client{
    
    console.log('Merging model with form data:', formClient, 'and userId:', this.userId);
    this.client.identityUserId = this.userId ?? '';
    this.client.age = formClient.age;
    this.client.city = formClient.city;
    this.client.firstName = formClient.firstName;
    this.client.lastName = formClient.lastName;
    this.client.phoneNumber = formClient.phoneNumber.toString();
    this.client.state = formClient.state;
    console.log('Merged client model:', this.client);
    return this.client;
  }

  checkValue(event: any) {
    return event.target.value.length === 10 ? event.preventDefault() : 
      String.fromCharCode(event.charCode).match(/[^0-9]/g) === null
    }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.getCurrentUserId();

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      age:       ['', [Validators.required, Validators.min(16), Validators.max(120)]],
      city:      ['', Validators.required],
      state:     ['', Validators.required],
      phoneNumber:     ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
    console.log('ProfileCreateComponent initialized with userId:', this.userId);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    console.log('hmmm',this.userId);
    const mergedModel = this.mergeModel(this.form.value);
    this.clientService.create(mergedModel).subscribe({
      next: () => {
        this.loading = false;
        console.log('Profile created successfully');
        this.router.navigate(['/profile']);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.message ?? 'Failed to create profile. Please try again.';
      }
    });
  }
}
