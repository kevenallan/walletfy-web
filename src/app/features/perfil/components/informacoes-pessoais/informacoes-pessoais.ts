import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInformacoesPessoaisDTO } from '../../models/form-informacoes-pessoais';

@Component({
    selector: 'app-informacoes-pessoais',
    imports: [InputTextModule, DatePickerModule, FileUploadModule, Button, ReactiveFormsModule],
    templateUrl: './informacoes-pessoais.html',
    styleUrl: './informacoes-pessoais.css',
})
export class InformacoesPessoais {
    files: File[] = [];
    totalSize = 0;
    totalSizePercent = 0;
    private previewUrl: string | null = null;

    form!: FormGroup;

    constructor() {
        this.configurarFormulario();
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
