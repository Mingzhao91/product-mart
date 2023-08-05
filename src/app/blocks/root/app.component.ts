import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../auth.service';
import { User } from '../../core/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user!: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.findMe().subscribe((user) => (this.user = user));
    this.authService.user
      .pipe(takeUntilDestroyed())
      .subscribe((user) => (this.user = user));
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
