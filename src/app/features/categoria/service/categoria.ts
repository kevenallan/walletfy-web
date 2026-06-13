import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDTO } from '../models/categoria';

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {
    private _apiCategoria = environment.apiUrl + '/categoria';
    private _http = inject(HttpClient);

    listar(usuarioId: number): Observable<CategoriaDTO[]> {
        return this._http.get<CategoriaDTO[]>(`${this._apiCategoria}/${usuarioId}`);
    }

    cadastrar(usuarioId: number, categoria: CategoriaDTO): Observable<CategoriaDTO> {
        return this._http.post<CategoriaDTO>(`${this._apiCategoria}/${usuarioId}`, categoria);
    }

    atualizar(usuarioId: number, categoria: CategoriaDTO): Observable<CategoriaDTO> {
        return this._http.put<CategoriaDTO>(`${this._apiCategoria}/${usuarioId}`, categoria);
    }
}
