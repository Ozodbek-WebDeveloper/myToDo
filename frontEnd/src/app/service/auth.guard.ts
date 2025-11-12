import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // 1. Router servisiga kirish
  const router = inject(Router);

  // 2. localStorage dan tokenni tekshirish
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    // Agar token mavjud bo'lsa
    console.log('Guard: Ruxsat berildi. Token mavjud.'); // Tekshirish uchun log
    return true; 
  } else {
    // Agar token mavjud bo'lmasa
    console.log('Guard: Kirish taqiqlangan. Loginga yo\'naltirilmoqda...'); // Tekshirish uchun log
    
    // 3. Router.createUrlTree yordamida yo'naltirishni qaytarish (MUHIM QADAM)
    // Bu, qo'lda router.navigate() chaqirishdan ko'ra ishonchliroq
    return router.createUrlTree(['/login'], { 
        queryParams: { returnUrl: state.url } 
    });
  }
};