import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  email!: string;
  error$!: BehaviorSubject<string>;
  password!: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.error$ = new BehaviorSubject('');
  }

  login() {
    this.setError('');
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.setError(error.message);
      },
    });
  }

  private setError(msg: string) {
    return this.error$.next(msg);
  }
}
