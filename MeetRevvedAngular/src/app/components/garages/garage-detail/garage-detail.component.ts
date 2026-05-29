import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GarageService } from 'src/app/services/garage.service';
import { Garage } from 'src/app/models/garage.model';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
})
export class GarageDetailComponent implements OnInit {
  garage: Garage | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private garageService: GarageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.garageService.getByUserId(userId).subscribe({
      next: garage => {
        this.garage = garage;
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['/garages/create']);
      }
    });
  }

  navigateToEdit(): void {
    this.router.navigate(['/cars/edit', this.garage?.carId]);
  }

  navigateToDelete(): void {
    this.router.navigate(['/cars/delete', this.garage?.carId]);
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
