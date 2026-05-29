import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
})
export class CarEditComponent implements OnInit {
  carForm!: FormGroup;
  car: Car | null = null;
  loading = true;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getById(id).subscribe({
      next: car => {
        this.car = car;
        this.carForm = this.fb.group({
          vin: [car.vin, Validators.required],
          make: [car.make, Validators.required],
          model: [car.model, Validators.required],
          year: [car.year, [Validators.required, Validators.min(1886)]],
          mileage: [car.mileage, [Validators.required, Validators.min(0)]],
          mods: [car.mods],
          imageLocation: [car.imageLocation],
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load car.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.carForm.invalid || !this.car) return;
    this.submitting = true;
    this.error = null;
    const updated: Car = { ...this.car, ...this.carForm.value };
    this.carService.update(this.car.carId, updated).subscribe({
      next: () => this.router.navigate(['/cars', this.car!.carId]),
      error: () => {
        this.error = 'Failed to update car. Please try again.';
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/cars', this.car?.carId]);
  }
}
