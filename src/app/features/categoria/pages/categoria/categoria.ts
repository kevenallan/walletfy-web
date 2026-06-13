import { Component, HostListener, inject } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CardInformacoes } from '../../component/card/card';
import { Tabela } from '../../component/tabela/tabela';
import { CategoriaModel } from '../../models/categoria';
import { DialogService } from 'primeng/dynamicdialog';
import { Form } from '../../component/form/form';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-categoria',
    imports: [TableModule, CardInformacoes, Tabela, Button],
    templateUrl: './categoria.html',
    styleUrl: './categoria.css',
    providers: [DialogService],
})
export class Categoria {
    categorias: CategoriaModel[] = [
        {
            nome: 'Alimentação',
            icone: 'pi-apple',
            cor: '#FF0000',
            ativo: true,
        },
        {
            nome: 'Transporte',
            icone: 'pi-car',
            cor: '#A12345',
            ativo: true,
        },
        {
            nome: 'Bemais',
            icone: 'pi-shopping-cart',
            cor: '#FFC107',
            ativo: false,
        },
        {
            nome: 'Outro',
            icone: 'pi-th-large',
            cor: '#2437f5',
            ativo: true,
        },
        {
            nome: 'Energia',
            icone: 'pi-home',
            cor: '#777777',
            ativo: false,
        },
        {
            nome: 'Energia',
            icone: 'pi-bolt',
            cor: '#FFC107',
            ativo: true,
        },
    ];

    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    private dialogService = inject(DialogService);

    abrirForm(categoria?: CategoriaModel) {
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
            ref.onClose.subscribe((resultado: Categoria) => {
                if (resultado) {
                    // atualiza a lista
                }
            });
        }
    }
}
