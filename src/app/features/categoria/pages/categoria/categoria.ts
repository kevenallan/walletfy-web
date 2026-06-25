import { Component, HostListener, inject, OnInit, signal } from '@angular/core';

import { Tabela } from '../../components/tabela/tabela';
import { Form } from '../../components/form/form';
import { CategoriaDTO } from '../../models/categoria';
import { CardInformacoes } from '../../components/card/card';
import { CategoriaService } from '../../services/categoria';
import { NotificacaoService } from '../../../../core/services/notificacao';

import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TipoCategoria } from '../../../../core/enum/tipo-categoria';
@Component({
    selector: 'app-categoria',
    imports: [TableModule, CardInformacoes, Tabela, Button, TabsModule],
    templateUrl: './categoria.html',
    styleUrl: './categoria.css',
    providers: [DialogService],
})
export class Categoria implements OnInit {
    usuarioId = 1;
    categorias = signal<CategoriaDTO[]>([]);
    abaDespesa = TipoCategoria.DESPESA;
    abaReceita = TipoCategoria.RECEITA;
    abaSelecionada: TipoCategoria = TipoCategoria.DESPESA;
    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    private _dialogService = inject(DialogService);
    private _categoriaService = inject(CategoriaService);
    private _notificacaoService = inject(NotificacaoService);

    ngOnInit(): void {
        this.listar();
    }

    listar() {
        this._categoriaService.listar(this.usuarioId, this.abaSelecionada).subscribe({
            next: (response) => {
                this.categorias.set(response);
            },
        });
    }

    cadastrar(categoria: CategoriaDTO) {
        this._categoriaService.cadastrar(this.usuarioId, categoria).subscribe({
            next: () => {
                this.listar();
                this._notificacaoService.msgSucesso('Categoria cadastrada');
            },
        });
    }

    atualizar(categoria: CategoriaDTO) {
        this._categoriaService.atualizar(this.usuarioId, categoria).subscribe({
            next: () => {
                this.listar();
                this._notificacaoService.msgSucesso('Categoria atualizada');
            },
        });
    }

    abrirForm(categoria?: CategoriaDTO) {
        const ref = this._dialogService.open(Form, {
            header: categoria ? 'Editar Categoria' : 'Nova Categoria',
            width: '480px',
            height: '480px',
            breakpoints: { '768px': '90vw', '480px': '100vw' },
            closable: true,
            closeOnEscape: true,
            dismissableMask: true,
            data: { categoria },
        });

        if (ref) {
            ref.onClose.subscribe((resultado: CategoriaDTO) => {
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
}
