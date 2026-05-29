import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-rate',
  templateUrl: './car-rate.component.html',
})
export class CarRateComponent implements OnInit {
  rateForm!: FormGroup;
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
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load car.';
        this.loading = false;
      }
    });
    this.rateForm = this.fb.group({
      newRate: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit(): void {
    if (this.rateForm.invalid || !this.car) return;
    this.submitting = true;
    this.error = null;
    this.carService.rate(this.car.carId, this.rateForm.value.newRate).subscribe({
      next: () => this.router.navigate(['/meets']),
      error: () => {
        this.error = 'Failed to submit rating. Please try again.';
        this.submitting = false;
      }
    });
  }

  goToMeets(): void {
    this.router.navigate(['/meets']);
  }
}
