import { Component, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ResumoAnualResponseDTO } from '../../models/resumo-anual';
import { CurrencyPipe, TitleCasePipe, NgClass } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tabela',
    imports: [TableModule, CurrencyPipe, TitleCasePipe, NgClass, DatePickerModule, FormsModule],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela {
    resumoAnual = input<ResumoAnualResponseDTO[]>([]);
    data = signal(new Date());
}
