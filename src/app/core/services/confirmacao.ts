import { inject, Injectable } from '@angular/core';
import { ConfirmationService as PrimeConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

interface ConfirmOptions {
    mensagem?: string;
    cabecalho?: string;
    icone?: string;
    textoAceitacao?: string;
    textoRejeicao?: string;
    severidadeBotaoAceitacao?: string;
    severidadeBotaoRejeicao?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ConfirmacaoService {
    private confirmationService = inject(PrimeConfirmationService);

    abrirConfirmacao(options: ConfirmOptions = {}): Observable<boolean> {
        return new Observable((subscriber) => {
            this.confirmationService.confirm({
                message: options.mensagem ?? 'Tem certeza que deseja excluir este registro?',
                header: options.cabecalho ?? 'Confirmar exclusão',
                icon: options.icone ?? 'pi pi-exclamation-triangle',
                acceptLabel: options.textoAceitacao ?? 'Sim',
                rejectLabel: options.textoRejeicao ?? 'Não',
                acceptButtonProps: options.severidadeBotaoAceitacao
                    ? { severity: options.severidadeBotaoAceitacao }
                    : { severity: 'danger' },
                rejectButtonProps: options.severidadeBotaoRejeicao
                    ? { severity: options.severidadeBotaoRejeicao, outlined: true }
                    : {
                          severity: 'secondary',
                          outlined: true,
                      },
                accept: () => {
                    subscriber.next(true);
                    subscriber.complete();
                },
                reject: () => {
                    subscriber.next(false);
                    subscriber.complete();
                },
            });
        });
    }
}
