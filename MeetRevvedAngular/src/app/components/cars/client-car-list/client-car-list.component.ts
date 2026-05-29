import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ClientCarListRecord } from 'src/app/models/view-models.model';

@Component({
  selector: 'app-client-car-list',
  templateUrl: './client-car-list.component.html',
})
export class ClientCarListComponent implements OnInit {
  cars: ClientCarListRecord[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const garageId = Number(this.route.snapshot.paramMap.get('garageId'));
    this.carService.getByGarage(garageId).subscribe({
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
    this.router.navigate(['/cars/client', carId]);
  }

  goToGarage(): void {
    this.router.navigate(['/garages']);
  }
}
