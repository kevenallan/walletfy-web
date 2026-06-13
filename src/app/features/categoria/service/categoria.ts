import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categoria';

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {
    private _apiCategoria = environment.apiUrl + '/categoria';
    private _http = inject(HttpClient);

    listar(usuarioId: number): Observable<CategoriaModel[]> {
        return this._http.get<CategoriaModel[]>(`${this._apiCategoria}/${usuarioId}`);
    }

    cadastrar(usuarioId: number, categoria: CategoriaModel): Observable<CategoriaModel> {
        return this._http.post<CategoriaModel>(`${this._apiCategoria}/${usuarioId}`, categoria);
    }

    atualizar(usuarioId: number, categoria: CategoriaModel): Observable<CategoriaModel> {
        return this._http.put<CategoriaModel>(`${this._apiCategoria}/${usuarioId}`, categoria);
    }
}
