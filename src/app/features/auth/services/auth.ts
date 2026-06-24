import { computed, inject, Injectable, signal } from '@angular/core';
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
    private readonly STORAGE_KEY = 'usuario';
    private _apiAuth = environment.apiUrl + '/auth';

    private _usuario = signal<AuthResponseDTO | null>(this.carregarDoStorage());

    private _http = inject(HttpClient);

    readonly usuario = this._usuario.asReadonly();
    readonly isLogado = computed(() => this._usuario() !== null);
    readonly usuarioId = computed(() => this._usuario()?.id);

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

    login(loginRequest: LoginRequestDTO): Observable<AuthResponseDTO> {
        return this._http.post<AuthResponseDTO>(`${this._apiAuth}`, loginRequest);
    }

    cadastrar(cadastrarRequest: CadastroEdicaoRequestDTO): Observable<AuthResponseDTO> {
        return this._http.post<AuthResponseDTO>(`${this._apiAuth}/cadastrar`, cadastrarRequest);
    }
}
