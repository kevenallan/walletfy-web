import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';
import { NotificacaoService } from '../services/notificacao';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const notificacaoService = inject(NotificacaoService);
    const router = inject(Router);

    if (authService.isLogado() && !authService.tokenExpirado()) {
        return true;
    }

    authService.logout();
    router.navigate(['/login']);
    notificacaoService.msgInfo('Sua sessão expirou, faça o login novamente');
    return false;
};
