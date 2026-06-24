import { Component, inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { PopoverModule } from 'primeng/popover';
import { CadastroEdicaoRequestDTO } from '../../models/cadastro-edicao-request';
import { AuthService } from '../../services/auth';

@Component({
    selector: 'app-form-cadastro',
    imports: [
        IconField,
        InputIcon,
        Password,
        Button,
        InputTextModule,
        Checkbox,
        ReactiveFormsModule,
        PopoverModule,
    ],
    templateUrl: './form-cadastro.html',
    styleUrl: './form-cadastro.css',
})
export class FormCadastro {
    form!: FormGroup;

    private _authService = inject(AuthService);
    private _router = inject(Router);

    constructor() {
        this.configurarFormulario();
    }

    configurarFormulario() {
        this.form = new FormBuilder().group(
            {
                nome: [null, [Validators.required]],
                email: [null, [Validators.required, Validators.email]],
                senha: [null, [Validators.required]],
                senhaConfirmada: [null, [Validators.required]],
                termosAceitacao: [null, [Validators.required]],
            },
            {
                validators: this.senhasIguaisValidator(),
            },
        );
    }

    private senhasIguaisValidator(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const senha = group.get('senha')?.value;
            const senhaConfirmada = group.get('senhaConfirmada')?.value;

            return senha === senhaConfirmada ? null : { senhasDiferentes: true };
        };
    }

    cadastrar() {
        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();

        const formCamposValidos = this._validarCampos();

        if (this.form.invalid && !formCamposValidos) {
            return;
        }

        const requisicao = this._montarRequisicao();

        this._authService.cadastrar(requisicao).subscribe({
            next: () => {
                this._router.navigate(['/gasto']);
            },
        });
    }

    private _validarCampos(): boolean {
        const { termosAceitacao } = this.form.value;

        if (!termosAceitacao) {
            this.form.get('termosAceitacao')?.setErrors(['invalid']);

            return false;
        }

        return this.form.valid;
    }

    private _montarRequisicao(): CadastroEdicaoRequestDTO {
        return {
            nome: this.form.value.nome,
            email: this.form.value.email,
            senha: this.form.value.senha,
        };
    }
}
