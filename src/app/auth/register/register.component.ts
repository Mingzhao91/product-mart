import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@core/user.interface';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userForm = this.fb.group(
    {
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatch }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  passwordMatch(form: FormGroup) {
    const isNotMatched =
      form.get('password')?.dirty &&
      form.get('repeatPassword')?.dirty &&
      form.get('password')?.valid &&
      form.get('repeatPassword')?.valid &&
      form.get('password')?.value.trim() !==
        form.get('repeatPassword')?.value.trim();

    return isNotMatched ? { passwordMatch: true } : null;
  }

  register() {
    const user = this.userForm.getRawValue();

    this.authService.register(user as User).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
