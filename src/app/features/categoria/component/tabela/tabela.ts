import { Component, EventEmitter, HostListener, input, Output } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CategoriaModel } from '../../models/categoria';
import { ColorPickerModule } from 'primeng/colorpicker';

import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-tabela',
    imports: [
        TableModule,
        NgClass,
        ColorPickerModule,
        FormsModule,
        IconField,
        InputIcon,
        InputTextModule,
    ],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela {
    categorias = input<CategoriaModel[]>([]);
    @Output() editar = new EventEmitter<CategoriaModel>();

    isMobile = window.innerWidth < 768;
    tableSize: 'small' | 'large' | undefined = this.isMobile ? 'small' : undefined;
    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
        this.tableSize = this.isMobile ? 'small' : undefined;
    }
}
