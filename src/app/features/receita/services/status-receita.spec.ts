import { TestBed } from '@angular/core/testing';

import { StatusReceitaService } from './status-receita';

describe('StatusReceita', () => {
    let service: StatusReceitaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StatusReceitaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
