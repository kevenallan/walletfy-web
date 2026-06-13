import { computed, Injectable, signal } from '@angular/core';
import { LoginResponseDTO } from '../models/login-response';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly STORAGE_KEY = 'usuario';

    private _usuario = signal<LoginResponseDTO | null>(this.carregarDoStorage());

    readonly usuario = this._usuario.asReadonly();
    readonly isLogado = computed(() => this._usuario() !== null);
    readonly usuarioId = computed(() => this._usuario()?.id);

    salvar(usuario: LoginResponseDTO) {
        this._usuario.set(usuario);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    }

    logout() {
        this._usuario.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
    }

    private carregarDoStorage(): LoginResponseDTO | null {
        const dados = localStorage.getItem(this.STORAGE_KEY);
        return dados ? JSON.parse(dados) : null;
    }
}
