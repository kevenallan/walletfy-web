import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Main } from './layout/main/main';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'inicio',
        component: Main,
    },
];
