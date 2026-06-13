import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Categoria } from './features/categoria/pages/categoria/categoria';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        component: Main,
        children: [
            { path: '', redirectTo: 'categoria', pathMatch: 'full' },
            { path: 'categoria', component: Categoria },
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
