import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Main } from './layout/main/main';
import { Cadastro } from './features/auth/pages/cadastro/cadastro';

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
        path: 'cadastro',
        component: Cadastro,
    },
    {
        path: '',
        component: Main,
        children: [
            { path: '', redirectTo: 'categoria', pathMatch: 'full' },
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
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
