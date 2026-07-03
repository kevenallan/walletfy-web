import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Password } from 'primeng/password';
import { FormSegurancaDTO } from '../../models/form-seguranca';

@Component({
    selector: 'app-seguranca',
    imports: [Password, ReactiveFormsModule],
    templateUrl: './seguranca.html',
    styleUrl: './seguranca.css',
})
export class Seguranca {
    form!: FormGroup;

    constructor() {
        this.configurarFormulario();
    }

    configurarFormulario(): void {
        this.form = new FormBuilder().group(
            {
                senhaAtual: [null, [Validators.required]],
                senhaNova: [
                    null,
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/),
                    ],
                ],
                senhaNovaConfirmacao: [
                    null,
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/),
                    ],
                ],
            },
            {
                validators: this.senhasIguaisValidator(),
            },
        );
    }

    private senhasIguaisValidator(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const senha = group.get('senhaNova')?.value;
            const senhaConfirmada = group.get('senhaNovaConfirmacao')?.value;

            return senha === senhaConfirmada ? null : { senhasDiferentes: true };
        };
    }

    getFormValue(): Partial<FormSegurancaDTO> | null {
        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();

        if (this.form.invalid) {
            return null;
        }

        return this.form.value;
    }
}
