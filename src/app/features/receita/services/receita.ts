import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaResponseDTO } from '../models/receita-response';
import { ReceitaRequestDTO } from '../models/receita-request';

@Injectable({
    providedIn: 'root',
})
export class ReceitaService {
    private _apiReceita = environment.apiUrl + '/receita';
    private _http = inject(HttpClient);

    cadastrar(receita: ReceitaRequestDTO, usuarioId: number): Observable<ReceitaResponseDTO> {
        return this._http.post<ReceitaResponseDTO>(`${this._apiReceita}/${usuarioId}`, receita);
    }

    listar(
        usuarioId: number,
        dataInicio: string,
        dataFim: string,
    ): Observable<ReceitaResponseDTO[]> {
        return this._http.get<ReceitaResponseDTO[]>(`${this._apiReceita}/${usuarioId}`, {
            params: { dataInicio, dataFim },
        });
    }
    detalhar(receitaId: number, usuarioId: number): Observable<ReceitaResponseDTO> {
        const params = new HttpParams()
            .set('receitaId', receitaId.toString())
            .set('usuarioId', usuarioId.toString());

        return this._http.get<ReceitaResponseDTO>(`${this._apiReceita}`, { params });
    }
    atualizar(Receita: ReceitaRequestDTO, usuarioId: number): Observable<ReceitaResponseDTO> {
        return this._http.put<ReceitaResponseDTO>(`${this._apiReceita}/${usuarioId}`, Receita);
    }

    deletar(receitaId: number, usuarioId: number): Observable<ReceitaResponseDTO> {
        return this._http.delete<ReceitaResponseDTO>(
            `${this._apiReceita}/${usuarioId}/${receitaId}`,
        );
    }
}
