import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-garage-create',
  templateUrl: './garage-create.component.html',
})
export class GarageCreateComponent {
  error: string | null = null;
  submitting = false;

  constructor(
    private garageService: GarageService,
    private authService: AuthService,
    private router: Router
  ) {}

  createGarage(): void {
    this.submitting = true;
    this.error = null;
    this.garageService.create().subscribe({
      next: () => this.router.navigate(['/garages']),
      error: () => {
        this.router.navigate(['/cars/create']);
        this.error = 'Failed to create garage. Make sure you have a car registered first.';
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
