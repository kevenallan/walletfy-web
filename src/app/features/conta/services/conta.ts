import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaResponseDTO } from '../models/conta-response';
import { ContaRequestDTO } from '../models/conta-request';
import { ContaResumoResponseDTO } from '../models/conta-resumo-response';

@Injectable({
    providedIn: 'root',
})
export class ContaService {
    private _apiConta = environment.apiUrl + '/conta';
    private _http = inject(HttpClient);

    cadastrar(contaDTO: ContaRequestDTO): Observable<ContaResponseDTO> {
        return this._http.post<ContaResponseDTO>(`${this._apiConta}`, contaDTO);
    }

    listar(): Observable<ContaResponseDTO[]> {
        return this._http.get<ContaResponseDTO[]>(`${this._apiConta}`);
    }

    getResumo(): Observable<ContaResumoResponseDTO> {
        return this._http.get<ContaResumoResponseDTO>(`${this._apiConta}/resumo`);
    }

    atualizar(contaDTO: ContaRequestDTO): Observable<ContaRequestDTO> {
        return this._http.put<ContaRequestDTO>(`${this._apiConta}`, contaDTO);
    }

    deletar(contaId: number): Observable<void> {
        return this._http.delete<void>(`${this._apiConta}/${contaId}`);
    }
}
