import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const usuario = authService.usuario();

    if (usuario?.token) {
        const reqAutenticado = req.clone({
            setHeaders: {
                Authorization: `Bearer ${usuario.token}`,
            },
        });
        return next(reqAutenticado);
    }

    return next(req);
};
