import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaResponseDTO } from '../models/receita-response';
import { ReceitaRequestDTO } from '../models/receita-request';
import { ReceitaResumoMesDTO } from '../models/resumo-mes';

@Injectable({
    providedIn: 'root',
})
export class ReceitaService {
    private _apiReceita = environment.apiUrl + '/receita';
    private _http = inject(HttpClient);

    cadastrar(receita: ReceitaRequestDTO): Observable<ReceitaResponseDTO> {
        return this._http.post<ReceitaResponseDTO>(`${this._apiReceita}`, receita);
    }

    listar(dataInicio: string, dataFim: string): Observable<ReceitaResponseDTO[]> {
        return this._http.get<ReceitaResponseDTO[]>(`${this._apiReceita}`, {
            params: { dataInicio, dataFim },
        });
    }
    detalhar(receitaId: number): Observable<ReceitaResponseDTO> {
        const params = new HttpParams().set('receitaId', receitaId.toString());

        return this._http.get<ReceitaResponseDTO>(`${this._apiReceita}`, { params });
    }
    atualizar(Receita: ReceitaRequestDTO): Observable<ReceitaResponseDTO> {
        return this._http.put<ReceitaResponseDTO>(`${this._apiReceita}`, Receita);
    }

    deletar(receitaId: number): Observable<ReceitaResponseDTO> {
        return this._http.delete<ReceitaResponseDTO>(`${this._apiReceita}/${receitaId}`);
    }

    listarResumo(): Observable<ReceitaResumoMesDTO[]> {
        return this._http.get<ReceitaResumoMesDTO[]>(`${this._apiReceita}/resumo`);
    }
}
