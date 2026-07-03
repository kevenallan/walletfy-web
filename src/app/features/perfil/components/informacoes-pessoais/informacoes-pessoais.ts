import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-informacoes-pessoais',
    imports: [IconField, InputIcon, InputTextModule, DatePickerModule],
    templateUrl: './informacoes-pessoais.html',
    styleUrl: './informacoes-pessoais.css',
})
export class InformacoesPessoais {}
