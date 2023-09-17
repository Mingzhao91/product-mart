import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, of } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.authService
      .findMe()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        console.log('user: ', user);
        this.user = of(user);
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
