import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ClientSerivce } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-friend-index',
  templateUrl: './friend-index.component.html',
})
export class FriendIndexComponent implements OnInit {
  friends: Client[] = [];
  loading = true;

  constructor(
    private clientService: ClientSerivce,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.clientService.getById(userId).subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false)
    });
  }

  viewCar(clientId: number): void {
    this.router.navigate(['/cars/client', clientId]);
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
