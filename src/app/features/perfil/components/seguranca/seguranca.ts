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

        this.form.valueChanges.subscribe(() => {
            this.verificarObrigatoriedadeSenhas();
        });
    }

    configurarFormulario(): void {
        this.form = new FormBuilder().group(
            {
                senhaAtual: [null],
                senhaNova: [
                    null,
                    [
                        Validators.minLength(8),
                        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/),
                    ],
                ],
                senhaNovaConfirmacao: [
                    null,
                    [
                        Validators.minLength(8),
                        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/),
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
        this.verificarObrigatoriedadeSenhas();

        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();

        if (this.form.invalid) {
            return null;
        }

        return this.form.value;
    }

    private verificarObrigatoriedadeSenhas(): void {
        const campos = [
            this.form.get('senhaAtual'),
            this.form.get('senhaNova'),
            this.form.get('senhaNovaConfirmacao'),
        ];

        const algumPreenchido = campos.some((c) => !!c?.value);

        campos.forEach((control) => {
            if (!control) return;

            if (algumPreenchido) {
                control.addValidators(Validators.required);
            } else {
                control.removeValidators(Validators.required);

                control.markAsPristine();
                control.markAsUntouched();
            }

            control.updateValueAndValidity({ emitEvent: false });
        });
    }
}
