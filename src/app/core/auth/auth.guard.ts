import { inject } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

export const authGuard = (state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.redirectUrl = state.url.toString();

  if (authService.isUserLoggedIn) {
    return true;
  }

  router.navigate(['auth']);
  return false;
};
