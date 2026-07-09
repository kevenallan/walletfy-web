import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Main } from './layout/main/main';
import { Cadastro } from './features/auth/pages/cadastro/cadastro';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        canActivate: [noAuthGuard],
        component: Login,
    },
    {
        path: 'cadastro',
        canActivate: [noAuthGuard],
        component: Cadastro,
    },
    {
        path: '',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        component: Main,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/dashboard/pages/dashboard/dashboard').then(
                                (c) => c.Dashboard,
                            ),
                    },
                ],
            },
            {
                path: 'conta',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/conta/pages/conta/conta').then((c) => c.Conta),
                    },
                ],
            },
            {
                path: 'cartao',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/cartao/pages/cartao/cartao').then((c) => c.Cartao),
                    },
                ],
            },
            {
                path: 'receita',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/receita/pages/receita/receita').then(
                                (c) => c.Receita,
                            ),
                    },
                ],
            },
            {
                path: 'gasto',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/gasto/pages/gasto/gasto').then((c) => c.Gasto),
                    },
                    {
                        path: 'cadastrar',
                        loadComponent: () =>
                            import('./features/gasto/pages/form/form').then((c) => c.Form),
                    },
                    {
                        path: ':id/atualizar',
                        loadComponent: () =>
                            import('./features/gasto/pages/form/form').then((c) => c.Form),
                    },
                ],
            },
            {
                path: 'categoria',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/categoria/pages/categoria/categoria').then(
                                (c) => c.Categoria,
                            ),
                    },
                ],
            },
            {
                path: 'perfil',
                children: [
                    {
                        path: 'editar',
                        loadComponent: () =>
                            import('./features/perfil/pages/editar/editar').then((c) => c.Editar),
                    },
                ],
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
