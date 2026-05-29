import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getById(id).subscribe({
      next: car => {
        this.car = car;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load car details.';
        this.loading = false;
      }
    });
  }

  editCar(): void {
    this.router.navigate(['/cars/edit', this.car?.carId]);
  }

  goToList(): void {
    this.router.navigate(['/cars']);
  }
}
