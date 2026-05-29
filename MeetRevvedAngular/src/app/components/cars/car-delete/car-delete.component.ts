import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
})
export class CarDeleteComponent implements OnInit {
  car: Car | null = null;
  loading = true;
  deleting = false;
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
        this.error = 'Could not load car.';
        this.loading = false;
      }
    });
  }

  confirmDelete(): void {
    if (!this.car) return;
    this.deleting = true;
    this.carService.delete(this.car.carId).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: () => {
        this.error = 'Failed to delete car. Please try again.';
        this.deleting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/cars']);
  }
}
