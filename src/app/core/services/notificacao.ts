import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class NotificacaoService {
    private messageService = inject(MessageService);

    msgSucesso(message: string, summary = 'Sucesso') {
        this.messageService.add({
            severity: 'success',
            summary,
            detail: message,
            life: 3000,
        });
    }

    msgErro(message: string, summary = 'Erro') {
        this.messageService.add({
            severity: 'error',
            summary,
            detail: message,
            life: 5000,
        });
    }

    msgAviso(message: string, summary = 'Atenção') {
        this.messageService.add({
            severity: 'warn',
            summary,
            detail: message,
            life: 4000,
        });
    }

    msgInfo(message: string, summary = 'Informação') {
        this.messageService.add({
            severity: 'info',
            summary,
            detail: message,
            life: 3000,
        });
    }
}
