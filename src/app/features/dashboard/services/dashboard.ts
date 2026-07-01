import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResumoAnualResponseDTO } from '../models/resumo-anual';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private _apiDashboard = environment.apiUrl + '/dashboard';
    private _http = inject(HttpClient);
    listar(ano: number): Observable<ResumoAnualResponseDTO[]> {
        return this._http.get<ResumoAnualResponseDTO[]>(`${this._apiDashboard}`, {
            params: { ano },
        });
    }
}
