import { Component, effect, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FormInformacoesPessoaisDTO } from '../../models/form-informacoes-pessoais';
import { UsuarioResponseDTO } from '../../models/usuario-response';
import { InputMaskModule } from 'primeng/inputmask';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    selector: 'app-informacoes-pessoais',
    imports: [
        InputTextModule,
        DatePickerModule,
        FileUploadModule,
        Button,
        ReactiveFormsModule,
        InputMaskModule,
        NgxMaskDirective,
    ],
    templateUrl: './informacoes-pessoais.html',
    styleUrl: './informacoes-pessoais.css',
})
export class InformacoesPessoais {
    files: File[] = [];
    totalSize = 0;
    totalSizePercent = 0;
    private previewUrl: string | null = null;

    form!: FormGroup;

    dadosInfo = input<UsuarioResponseDTO | null>({});

    constructor() {
        this.configurarFormulario();

        effect(() => {
            const dados = this.dadosInfo();
            if (dados) {
                this._preencherDados(dados);
            }
        });
    }

    configurarFormulario(): void {
        this.form = new FormBuilder().group({
            nome: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            telefone: [null],
            dataNascimento: [null],
            foto: [null as File | null],
        });
    }

    private _preencherDados(dados: UsuarioResponseDTO) {
        this.form.patchValue({
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone,
            dataNascimento: dados.dataNascimento ? new Date(dados.dataNascimento) : null,
        });
    }

    choose(event: MouseEvent, chooseCallback: () => void): void {
        chooseCallback();
    }

    onSelectedFiles(event: FileSelectEvent): void {
        if (this.previewUrl) {
            URL.revokeObjectURL(this.previewUrl);
            this.previewUrl = null;
        }

        this.files = event.currentFiles;
        this.form.get('foto')?.setValue(this.files[0]);
        this.totalSize = 0;
        this.files.forEach((file: File) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalSizePercent = this.totalSize / 10;
    }

    getPreviewUrl(file: File): string {
        if (!this.previewUrl) {
            this.previewUrl = URL.createObjectURL(file);
        }
        return this.previewUrl;
    }

    onTemplatedUpload(): void {
        this.files = [];
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }

    uploadEvent(uploadCallback: () => void): void {
        uploadCallback();
    }

    formatSize(bytes: number): string {
        const k = 1024;
        const dm = 3;
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return '0 Bytes';

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    getFormValue(): Partial<FormInformacoesPessoaisDTO> | null {
        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();

        if (this.form.invalid) {
            return null;
        }

        return this.form.value;
    }
}
