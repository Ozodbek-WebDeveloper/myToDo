// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      return true;
    }

    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  return router.createUrlTree(['/login']);
};

