import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private router: Router,
    private authService: AuthService) {

  }

  login() {
    this.authService.login(this.email, this.password)
    .subscribe(() => {
      this.router.navigate(['/'])
    });
  }
}
