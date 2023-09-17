import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, merge } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = merge(this.authService.findMe(), this.authService.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
