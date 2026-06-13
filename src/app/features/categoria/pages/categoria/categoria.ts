import { Component, HostListener, inject, OnInit, signal } from '@angular/core';

import { Tabela } from '../../component/tabela/tabela';
import { Form } from '../../component/form/form';
import { CategoriaDTO } from '../../models/categoria';
import { CardInformacoes } from '../../component/card/card';
import { CategoriaService } from '../../service/categoria';

import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
@Component({
    selector: 'app-categoria',
    imports: [TableModule, CardInformacoes, Tabela, Button],
    templateUrl: './categoria.html',
    styleUrl: './categoria.css',
    providers: [DialogService],
})
export class Categoria implements OnInit {
    usuarioId = 1;
    categorias = signal<CategoriaDTO[]>([]);

    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    private dialogService = inject(DialogService);
    private categoriaService = inject(CategoriaService);

    ngOnInit(): void {
        this.listar();
    }

    listar() {
        this.categoriaService.listar(this.usuarioId).subscribe({
            next: (response) => {
                this.categorias.set(response);
            },
            error: (httpError) => {
                window.alert('RIP: ' + httpError.error.mensagem);
            },
        });
    }

    cadastrar(categoria: CategoriaDTO) {
        this.categoriaService.cadastrar(this.usuarioId, categoria).subscribe({
            next: () => {
                this.listar();
            },
            error(httpError) {
                window.alert(httpError.error.mensagem);
            },
        });
    }

    atualizar(categoria: CategoriaDTO) {
        this.categoriaService.atualizar(this.usuarioId, categoria).subscribe({
            next: () => {
                this.listar();
            },
            error: (httpError) => {
                window.alert(httpError.error.mensagem);
            },
        });
    }

    abrirForm(categoria?: CategoriaDTO) {
        const ref = this.dialogService.open(Form, {
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
