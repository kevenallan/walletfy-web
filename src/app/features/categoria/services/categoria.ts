import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDTO } from '../models/categoria';
import { TipoCategoria } from '../../../core/enum/tipo-categoria';

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {
    private _apiCategoria = environment.apiUrl + '/categoria';
    private _http = inject(HttpClient);

    listar(tipoCategoria: TipoCategoria): Observable<CategoriaDTO[]> {
        const params = new HttpParams().set('tipo', tipoCategoria);
        return this._http.get<CategoriaDTO[]>(`${this._apiCategoria}`, { params });
    }

    cadastrar(categoria: CategoriaDTO): Observable<CategoriaDTO> {
        return this._http.post<CategoriaDTO>(`${this._apiCategoria}`, categoria);
    }

    atualizar(categoria: CategoriaDTO): Observable<CategoriaDTO> {
        return this._http.put<CategoriaDTO>(`${this._apiCategoria}`, categoria);
    }
}
