import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Menu } from './shared/components/menu/menu';

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
        path: 'menu',

        component: Menu,
    },
];
