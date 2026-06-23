import { Component } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'app-form-cadastro',
    imports: [IconField, InputIcon, Password, Button, InputTextModule, Checkbox],
    templateUrl: './form-cadastro.html',
    styleUrl: './form-cadastro.css',
})
export class FormCadastro {}
