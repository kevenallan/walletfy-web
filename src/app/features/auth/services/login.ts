import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginRequestDTO } from '../models/login-request';
import { LoginResponseDTO } from '../models/login-response';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private _apiLogin = environment.apiUrl + '/auth';

    private _http = inject(HttpClient);

    login(loginRequest: LoginRequestDTO): Observable<LoginResponseDTO> {
        return this._http.post<LoginResponseDTO>(`${this._apiLogin}`, loginRequest);
    }
}
