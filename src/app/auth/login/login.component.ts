import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  error!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('user: ', user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
