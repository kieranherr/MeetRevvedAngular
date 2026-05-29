import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarageService } from 'src/app/services/garage.service';
import { Garage } from 'src/app/models/garage.model';

@Component({
  selector: 'app-garage-edit',
  templateUrl: './garage-edit.component.html',
})
export class GarageEditComponent implements OnInit {
  garage: Garage | null = null;
  error: string | null = null;
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

  save(): void {
    if (!this.garage) return;
    this.submitting = true;
    this.error = null;
    this.garageService.update(this.garage.garageId, this.garage).subscribe({
      next: () => this.router.navigate(['/garages']),
      error: () => {
        this.error = 'Failed to update garage.';
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/garages']);
  }
}
