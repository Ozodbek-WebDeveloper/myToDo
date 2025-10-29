import { Routes } from '@angular/router';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(c => c.Home),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(c => c.Login),
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(c => c.Register),
    },
    {
        path: 'profil',
        loadComponent: () => import('./pages/profil/profil').then(c => c.Profil)
    },
    {
        path: '**',
        redirectTo: '',
    },
];
