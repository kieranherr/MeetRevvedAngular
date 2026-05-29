import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  isRegisterMode = false;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.form.value;

    const request$ = this.isRegisterMode
      ? this.authService.register({ email, password })
      : this.authService.login({ email, password });

    request$.subscribe({
      next: () => {
        if (this.isRegisterMode) {
        this.router.navigate(['/profile/create']);
        } else {
        this.router.navigate(['/profile']);
        }
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.message ?? 'Something went wrong. Please try again.';
      },
      complete: () => (this.loading = false),
    });
  }
}
