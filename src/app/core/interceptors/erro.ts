import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';
import { NotificacaoService } from '../services/notificacao';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
    const notification = inject(NotificacaoService);

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
                    notification.msgInfo('Sua sessão expirou. Faça login novamente.');
                }
                return throwError(() => error);
            }

            notification.msgErro(error.error?.mensagem ?? 'Erro inesperado.');
            return throwError(() => error);
        }),
    );
};
