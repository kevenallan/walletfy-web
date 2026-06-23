import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaResponseDTO } from '../models/receita-response';
import { ReceitaRequestDTO } from '../models/receita-request';

@Injectable({
    providedIn: 'root',
})
export class ReceitaService {
    private _apiReceita = environment.apiUrl + '/receita';
    private _http = inject(HttpClient);

    listar(
        usuarioId: number,
        dataInicio: string,
        dataFim: string,
    ): Observable<ReceitaResponseDTO[]> {
        return this._http.get<ReceitaResponseDTO[]>(`${this._apiReceita}/${usuarioId}`, {
            params: { dataInicio, dataFim },
        });
    }
    cadastrar(receita: ReceitaRequestDTO, usuarioId: number): Observable<ReceitaResponseDTO> {
        return this._http.post<ReceitaResponseDTO>(`${this._apiReceita}/${usuarioId}`, receita);
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
