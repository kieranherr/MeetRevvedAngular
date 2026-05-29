import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ClientSerivce } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  email: string | null = null;
  user: Client | null = null;
  fullName: string | null = null; 
  constructor(
    private authService: AuthService, 
    private router: Router,
    private clientService: ClientSerivce) {}

    initProfile(): void {
      const userId = this.authService.getUserId();
      if (!userId) {
        console.error('No user ID found. Cannot load profile.');
        return;
      }
      else{
        this.clientService.getById(userId).subscribe({
          next: client => {
            this.user = client;
            this.fullName = `${client.firstName} ${client.lastName}`;
            console.log('Client data loaded:', client); 
          },
          error: err => {
            console.error('Error loading client data:', err);
          }
        });
      }
    }

    navigateToEdit(): void {
      this.router.navigate(['/profile/edit']);
    }
    navigateToCars(): void {
      this.router.navigate(['/cars']);
    }
    navigateToMeets(): void {
      this.router.navigate(['/meets']);
    }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.email = localStorage.getItem('auth_email');
    this.initProfile();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
