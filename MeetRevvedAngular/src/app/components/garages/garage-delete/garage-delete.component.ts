import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarageService } from 'src/app/services/garage.service';
import { Garage } from 'src/app/models/garage.model';

@Component({
  selector: 'app-garage-delete',
  templateUrl: './garage-delete.component.html',
})
export class GarageDeleteComponent implements OnInit {
  garage: Garage | null = null;
  submitting = false;

  constructor(
    private garageService: GarageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garageService.getById(id).subscribe({
      next: garage => (this.garage = garage),
      error: () => this.router.navigate(['/garages'])
    });
  }

  confirmDelete(): void {
    if (!this.garage) return;
    this.submitting = true;
    this.garageService.delete(this.garage.garageId).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: () => (this.submitting = false)
    });
  }

  goBack(): void {
    this.router.navigate(['/garages']);
  }
}
