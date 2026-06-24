import { Component, ElementRef, OnInit, output, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Popover, PopoverModule } from 'primeng/popover';
import { CadastroEdicaoRequestDTO } from '../../models/cadastro-edicao-request';

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
export class FormCadastro implements OnInit {
    form!: FormGroup;
    formOutput = output<CadastroEdicaoRequestDTO>();

    @ViewChild('op') op!: Popover;
    @ViewChild('targetEl') targetEl!: ElementRef;

    constructor() {
        this.configurarFormulario();
    }

    ngOnInit(): void {
        this.form.get('termosAceitacao')?.valueChanges.subscribe((value) => {
            if (value) {
                this.op.hide();
            }
        });
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

    onCadastrarClick(event: Event) {
        const aceitouTermos = this.form.get('termosAceitacao')?.value;

        if (!aceitouTermos) {
            this.op.show(event, this.targetEl.nativeElement);
            return;
        }

        this.cadastrar();
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

        this.formOutput.emit(requisicao);
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
