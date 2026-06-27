import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthResponseDTO } from '../models/auth-response';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDTO } from '../models/login-request';
import { Observable } from 'rxjs';
import { CadastroEdicaoRequestDTO } from '../models/cadastro-edicao-request';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _apiAuth = environment.apiUrl + '/auth';
    private _http = inject(HttpClient);
    private readonly STORAGE_KEY = 'usuario';
    private _usuario = signal<AuthResponseDTO | null>(this.carregarDoStorage());

    readonly usuario = this._usuario.asReadonly();
    readonly isLogado = computed(() => this._usuario() !== null && !this.tokenExpirado());

    constructor() {
        effect(() => {
            if (this._usuario() && this.tokenExpirado()) {
                this.logout();
            }
        });
    }

    salvar(usuario: AuthResponseDTO) {
        this._usuario.set(usuario);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    }

    logout() {
        this._usuario.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
    }

    private carregarDoStorage(): AuthResponseDTO | null {
        const dados = localStorage.getItem(this.STORAGE_KEY);
        return dados ? JSON.parse(dados) : null;
    }

    tokenExpirado(): boolean {
        const token = this._usuario()?.token;
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return Date.now() > payload.exp * 1000;
        } catch {
            return true;
        }
    }

    login(loginRequest: LoginRequestDTO): Observable<AuthResponseDTO> {
        return this._http.post<AuthResponseDTO>(`${this._apiAuth}`, loginRequest);
    }

    cadastrar(cadastrarRequest: CadastroEdicaoRequestDTO): Observable<AuthResponseDTO> {
        return this._http.post<AuthResponseDTO>(`${this._apiAuth}/cadastrar`, cadastrarRequest);
    }
}
