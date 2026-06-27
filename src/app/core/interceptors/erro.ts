import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificacaoService } from '../services/notificacao';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
    const notification = inject(NotificacaoService);
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
                notification.msgErro('Não foi possível conectar ao servidor.');
                return throwError(() => error);
            }

            if (error.status === 401) {
                if (req.url.includes('/auth')) {
                    notification.msgErro(error.error?.mensagem ?? 'E-mail ou senha inválidos.');
                } else {
                    authService.logout();
                    router.navigate(['/login']);
                    notification.msgInfo('Sua sessão expirou. Faça login novamente.');
                }
                return throwError(() => error);
            }

            notification.msgErro(error.error?.mensagem ?? 'Erro inesperado.');
            return throwError(() => error);
        }),
    );
};
