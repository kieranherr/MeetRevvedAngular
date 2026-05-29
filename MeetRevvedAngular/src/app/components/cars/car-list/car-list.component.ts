import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ClientCarListRecord } from 'src/app/models/view-models.model';
import { GarageService } from 'src/app/services/garage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
})
export class CarListComponent implements OnInit {
  cars: ClientCarListRecord[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private carService: CarService,
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
    this.carService.getAllByUser(userId).subscribe({
      next: cars => {
         this.cars = cars;
            this.loading = false;
      },
       error: () => {
            this.error = 'Could not load cars.';
            this.loading = false;
          }
    });
  }

  viewCar(carId: number): void {
    this.router.navigate(['/cars', carId]);
  }

  deleteCar(carId: number): void {
    this.router.navigate(['/cars/delete', carId]);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  addCar(): void {
    this.router.navigate(['/cars/create']);
  }
}
