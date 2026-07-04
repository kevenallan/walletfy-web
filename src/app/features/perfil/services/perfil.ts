import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormDTO } from '../models/form';
import { Observable } from 'rxjs';
import { UsuarioResponseDTO } from '../models/usuario-response';

@Injectable({
    providedIn: 'root',
})
export class PerfilService {
    private _apiUsuario = environment.apiUrl + '/usuario';

    private _http = inject(HttpClient);

    atualizarUsuario(usuarioForm: FormDTO): Observable<UsuarioResponseDTO> {
        return this._http.put<UsuarioResponseDTO>(`${this._apiUsuario}`, usuarioForm);
    }

    detalharUsuario(): Observable<UsuarioResponseDTO> {
        return this._http.get<UsuarioResponseDTO>(`${this._apiUsuario}`);
    }

    deletarUsuario(): Observable<void> {
        return this._http.delete<void>(`${this._apiUsuario}`);
    }
}
