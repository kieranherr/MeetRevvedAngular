import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { GarageService } from 'src/app/services/garage.service';
import { AuthService } from '../../auth/auth.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
})
export class CarCreateComponent implements OnInit {
  carForm!: FormGroup;
  userId: string | null = null;
  submitting = false;
  error: string | null = null;
  carMerge: Car = {} as Car;
  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private garageService: GarageService,
    private authService: AuthService,
    private router: Router
  ) {}

    mergeModel(formCar: FormGroup<any>): Car{
      this.carMerge.identityUserId = this.userId ?? '';
      this.carMerge.vin = formCar.value.vin;
      this.carMerge.make = formCar.value.make;
      this.carMerge.model = formCar.value.model;
      this.carMerge.year = formCar.value.year;
      this.carMerge.mileage = formCar.value.mileage;
      this.carMerge.mods = formCar.value.mods;
      this.carMerge.imageLocation = formCar.value.imageLocation;

  
      return this.carMerge;
    }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.carForm = this.fb.group({
      vin: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1886)]],
      mileage: ['', [Validators.required, Validators.min(0)]],
      mods: [''],
      imageLocation: [''],
    });
  }

  onSubmit(): void {
    if (this.carForm.invalid) return;
    this.submitting = true;
    this.error = null;
    const mergedCar = this.mergeModel(this.carForm);
    this.carService.create(mergedCar).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: () => {
        this.error = 'Failed to create car. Please try again.';
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/cars']);
  }
}
