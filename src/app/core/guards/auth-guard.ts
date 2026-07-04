import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';
import { NotificacaoService } from '../services/notificacao';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const notificacaoService = inject(NotificacaoService);

    if (authService.isLogado() && !authService.tokenExpirado()) {
        return true;
    }

    authService.logout();
    notificacaoService.msgInfo('Sua sessão expirou, faça o login novamente');
    return false;
};
