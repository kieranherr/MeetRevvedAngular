import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarMeetCar } from 'src/app/models/view-models.model';

@Component({
  selector: 'app-car-top-three',
  templateUrl: './car-top-three.component.html',
})
export class CarTopThreeComponent implements OnInit {
  cars: CarMeetCar[] = [];
  meetId: number = 0;
  loading = true;
  error: string | null = null;
  hasEntries = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetId = Number(this.route.snapshot.paramMap.get('meetId'));
    this.carService.getTopThreeByMeet(this.meetId).subscribe({
      next: cars => {
        this.cars = cars.filter(c => c.make != null);
        this.hasEntries = this.cars.length > 0;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load top cars.';
        this.loading = false;
      }
    });
  }

  backToMeet(): void {
    this.router.navigate(['/meets', this.meetId]);
  }
}
