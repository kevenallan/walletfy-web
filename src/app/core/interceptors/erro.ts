import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificacaoService } from '../services/notificacao';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

// const METHODS_COM_SUCESSO = ['POST', 'PUT', 'PATCH', 'DELETE'];

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
    const notification = inject(NotificacaoService);
    const router = inject(Router);

    return next(req).pipe(
        tap(() => {
            // if (event.type === HttpEventType.Response && METHODS_COM_SUCESSO.includes(req.method)) {
            //     const customMessage = req.context.get(SUCCESS_MESSAGE);
            //     notification.success(customMessage ?? 'Operação realizada com sucesso!');
            // }
            // console.log(event);
        }),
        catchError((error: HttpErrorResponse) => {
            const msg = getErrorMessage(error);

            if (msg.includes('conectar ao servidor')) {
                router.navigate(['/login']);
            }

            notification.msgErro(msg);
            return throwError(() => error);
        }),
    );
};

function getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
        return 'Não foi possível conectar ao servidor.';
    }

    console.log(error);

    return error.error.mensagem;
}
