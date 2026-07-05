import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from '../../components/card/card';
import { Tabela } from '../../components/tabela/tabela';
import { TipoConta } from '../../../../core/enum/tipo-conta';
import { ContaResponseDTO } from '../../models/conta-response';
import { DialogService } from 'primeng/dynamicdialog';
import { Form } from '../../components/form/form';
import { ContaService } from '../../services/conta';
import { ContaRequestDTO } from '../../models/conta-request';
import { NotificacaoService } from '../../../../core/services/notificacao';

@Component({
    selector: 'app-conta',
    imports: [Button, Card, Tabela],
    templateUrl: './conta.html',
    styleUrl: './conta.css',
    providers: [DialogService],
})
export class Conta implements OnInit {
    contaResponseDTO = signal<ContaResponseDTO[]>([
        {
            id: 1,
            nome: 'Nubank',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'Nubank',
                icone: 'nubank',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'bb',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'bb',
                icone: 'bb',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'bradesco',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'bradesco',
                icone: 'bradesco',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'c6',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'c6',
                icone: 'c6',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'caixa',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'caixa',
                icone: 'caixa',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'inter',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'inter',
                icone: 'inter',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'itau',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'itau',
                icone: 'itau',
                cor: '#8A05BE',
            },
        },
        {
            id: 1,
            nome: 'santander',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'santander',
                icone: 'santander',
                cor: '#8A05BE',
            },
        },
    ]);
    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }
    verResumo = false;
    private _dialogService = inject(DialogService);
    private _contaService = inject(ContaService);
    private _noitificacaoService = inject(NotificacaoService);

    ngOnInit(): void {
        this.listar();
    }

    listar() {
        this._contaService.listar().subscribe({
            next: (response) => {
                this.contaResponseDTO.set(response);
            },
        });
    }

    abrirForm(conta?: ContaResponseDTO) {
        const isMobile = window.innerWidth <= 768;
        const ref = this._dialogService.open(Form, {
            header: conta ? 'Editar Conta' : 'Nova Conta',
            width: '550px',
            height: isMobile ? '570px' : '510px',
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
                        // this.atualizar(resultado);
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
                this._noitificacaoService.msgSucesso('Conta cadastrada');
                this.listar();
            },
        });
    }
}
