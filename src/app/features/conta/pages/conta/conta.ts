import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from '../../components/card/card';
import { Tabela } from '../../components/tabela/tabela';
import { ContaResponseDTO } from '../../models/conta-response';
import { DialogService } from 'primeng/dynamicdialog';
import { Form } from '../../components/form/form';
import { ContaService } from '../../services/conta';
import { ContaRequestDTO } from '../../models/conta-request';
import { NotificacaoService } from '../../../../core/services/notificacao';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';
import { ContaResumoResponseDTO } from '../../models/conta-resumo-response';

@Component({
    selector: 'app-conta',
    imports: [Button, Card, Tabela],
    templateUrl: './conta.html',
    styleUrl: './conta.css',
    providers: [DialogService],
})
export class Conta implements OnInit {
    contaResponseDTO = signal<ContaResponseDTO[]>([]);
    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }
    verResumo = false;

    resumo = signal<ContaResumoResponseDTO | null>(null);

    private _dialogService = inject(DialogService);
    private _contaService = inject(ContaService);
    private _notificacaoService = inject(NotificacaoService);
    private _confirmacaoService = inject(ConfirmacaoService);

    ngOnInit(): void {
        this.listar();
        this.getResumo();
    }

    listar() {
        this._contaService.listar().subscribe({
            next: (response) => {
                this.contaResponseDTO.set(response);
            },
        });
    }

    getResumo() {
        this._contaService.getResumo().subscribe({
            next: (response) => {
                this.resumo.set(response);
            },
        });
    }

    abrirForm(conta?: ContaResponseDTO) {
        // const isMobile = window.innerWidth <= 768;
        const ref = this._dialogService.open(Form, {
            header: conta ? 'Editar Conta' : 'Nova Conta',
            width: '550px',
            breakpoints: { '768px': '90vw', '480px': '100vw' },
            closable: true,
            closeOnEscape: true,
            dismissableMask: true,
            data: { conta },
        });

        if (ref) {
            ref.onClose.subscribe((resultado: ContaRequestDTO) => {
                if (resultado) {
                    if (resultado.id) {
                        this.atualizar(resultado);
                    } else {
                        this.cadastrar(resultado);
                    }
                }
            });
        }
    }

    cadastrar(contaDTO: ContaRequestDTO) {
        this._contaService.cadastrar(contaDTO).subscribe({
            next: () => {
                this._notificacaoService.msgSucesso('Conta cadastrada');
                this.listar();
            },
        });
    }

    atualizar(contaDTO: ContaRequestDTO) {
        this._contaService.atualizar(contaDTO).subscribe({
            next: () => {
                this._notificacaoService.msgSucesso('Conta atualizada');
                this.listar();
            },
        });
    }

    deletar(contaId: number) {
        this._confirmacaoService.abrirConfirmacao().subscribe({
            next: (confirmacao) => {
                if (confirmacao) {
                    this._contaService.deletar(contaId).subscribe({
                        next: () => {
                            this._notificacaoService.msgSucesso('Conta deletada');
                            this.listar();
                        },
                    });
                }
            },
        });
    }
}
