import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Categoria } from './features/categoria/pages/categoria/categoria';
import { Login } from './features/auth/pages/login/login';
import { Gasto } from './features/gasto/pages/gasto/gasto';

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
            { path: 'gasto', component: Gasto },
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
