import { TestBed } from '@angular/core/testing';

import { ConfirmacaoService } from './confirmacao';

describe('Confirmacao', () => {
    let service: ConfirmacaoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfirmacaoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
